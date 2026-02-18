using System.Reflection;
using System.Text.Json;

public sealed class DriverDispatcher {
    private readonly object _target;
    private readonly Dictionary<string, MethodInfo> _methods;

    public DriverDispatcher(object target) {
        _target = target;

        _methods = target.GetType()
            .GetMethods(BindingFlags.Instance | BindingFlags.Public)
            .Where(m => !m.IsSpecialName)
            .GroupBy(m => m.Name)
            .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
    }

    public object? Invoke(string methodName, JsonElement[] args) {
        if (!_methods.TryGetValue(methodName, out var method))
            throw new InvalidOperationException($"Unknown method: {methodName}");

        var parameters = method.GetParameters();
        if (parameters.Length != args.Length)
            throw new InvalidOperationException(
                $"Invalid argument count for {methodName}. Expected {parameters.Length}, got {args.Length}.");

        var converted = new object?[args.Length];
        for (int i = 0; i < args.Length; i++)
            converted[i] = ConvertArg(args[i], parameters[i].ParameterType);

        try {
            var ret = method.Invoke(_target, converted);

            // void => null
            if (method.ReturnType == typeof(void))
                return null;

            return ret;
        }
        catch (TargetInvocationException tie) when (tie.InnerException is not null) {
            // pokaż prawdziwy błąd z metody
            throw tie.InnerException;
        }
    }

    private static MethodInfo PickBestOverload(List<MethodInfo> overloads) {
        // Minimalnie: wybierz pierwszy (jeśli nie masz overloadów, to wystarczy).
        // Jeśli masz overloady, możesz tu dopisać lepsze dopasowanie po liczbie parametrów.
        return overloads[0];
    }

    private static object? ConvertArg(JsonElement el, Type targetType) {
        // null
        if (el.ValueKind == JsonValueKind.Null) {
            if (!targetType.IsValueType || Nullable.GetUnderlyingType(targetType) != null)
                return null;
            throw new InvalidOperationException($"Cannot pass null to non-nullable type {targetType.Name}.");
        }

        // podstawowe szybkie ścieżki
        if (targetType == typeof(string)) return el.GetString();
        if (targetType == typeof(int)) return el.GetInt32();
        if (targetType == typeof(long)) return el.GetInt64();
        if (targetType == typeof(bool)) return el.GetBoolean();
        if (targetType == typeof(double)) return el.GetDouble();
        if (targetType == typeof(decimal)) return el.GetDecimal();

        // fallback: JSON -> typ parametru
        var json = el.GetRawText();
        return JsonSerializer.Deserialize(json, targetType, new JsonSerializerOptions {
            PropertyNameCaseInsensitive = true
        });
    }
}
