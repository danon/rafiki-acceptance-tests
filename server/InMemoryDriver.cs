using System.Text.Json.Serialization;

namespace server;

public record DslTransaction(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("amount")] double Amount
);

public record ProjectContributor(string ProjectName, string ContributorName);

public sealed class Bill {
    public required string ProjectName { get; init; }
    public required string Description { get; set; }
    public required string Date { get; set; }
    public bool Sealed { get; set; }
    public required string Owner { get; init; }
    public double EndAmount { get; init; }
}

public sealed class InMemoryDriver {
    public HashSet<string> RegisteredUsers { get; } = new();
    public Dictionary<string, string> ProjectOwners { get; } = new();
    public List<Bill> Bills { get; } = new();
    public string? CurrentUser { get; private set; } = null;
    public List<ProjectContributor> ProjectContributors { get; private set; } = new();

    // auth

    public void RegisterUserAndLogin(string userName) {
        if (RegisteredUsers.Contains(userName))
            throw new Exception("Failed to register a user, user already exists.");

        RegisteredUsers.Add(userName);
        LoginUser(userName);
    }

    public void LogoutUser() {
        ValidateUserLoggedIn("Failed to logout user");
        CurrentUser = null;
    }

    public void LoginUser(string userName) {
        if (CurrentUser != null)
            throw new Exception("Failed to login a user, other user is already logged in.");

        CurrentUser = userName;
    }

    // core

    public void CreateProject(string projectName) {
        if (ProjectExists(projectName))
            throw new Exception("Failed to create a project, project already exists.");

        ValidateUserLoggedIn("Failed to create a project");
        ProjectOwners[projectName] = CurrentUser!;
        InviteProjectContributor(projectName, CurrentUser!);
    }

    public bool ProjectExists(string projectName) => ProjectOwners.ContainsKey(projectName);

    public void AddBill(string projectName, string billDescription, string date, double endAmount) {
        ValidateUserLoggedIn("Failed to add a bill");
        Bills.Add(new Bill {
            ProjectName = projectName,
            Description = billDescription,
            Date = date,
            Sealed = false,
            Owner = CurrentUser!,
            EndAmount = endAmount,
        });
    }

    public bool ProjectContainsBill(string projectName, string billDescription) {
        if (!ProjectExists(projectName))
            throw new Exception("Failed to find bill of project, project does not exist.");

        return FindBillOptional(projectName, billDescription) != null;
    }

    private Bill? FindBillOptional(string projectName, string billDescription)
        => FilteredBills().Find(b => b.ProjectName == projectName && b.Description == billDescription);

    private Bill FindBill(string projectName, string billDescription)
        => FindBillOptional(projectName, billDescription)
           ?? throw new Exception("Failed to find project bill, bill does not exist.");

    public void InviteProjectContributor(string projectName, string projectContributor)
        => ProjectContributors.Add(new ProjectContributor(projectName, projectContributor));

    public void RemoveProjectContributor(string projectName, string projectContributor) {
        ProjectContributors = ProjectContributors
            .Where(pc => pc.ProjectName != projectName || pc.ContributorName != projectContributor)
            .ToList();
    }

    public bool IsUserProjectMember(string userName, string projectName) {
        if (!ProjectExists(projectName))
            throw new Exception("Failed to find bill of project, project does not exist.");

        if (!UserExists(userName))
            throw new Exception("Failed to check if user is member of project, user does not exist.");

        return ProjectContributors.Any(pc => pc.ProjectName == projectName && pc.ContributorName == userName);
    }

    // core.bill-support

    public void SealBill(string projectName, string billDescription) {
        var bill = FindBill(projectName, billDescription);
        if (bill.Sealed)
            throw new Exception("Failed to seal bill, bill already sealed.");

        bill.Sealed = true;
    }

    public void UpdateBillDate(string projectName, string billDescription, string date)
        => FindBill(projectName, billDescription).Date = date;

    public void UpdateBillDescription(string projectName, string billDescription, string updatedBillDescription)
        => FindBill(projectName, billDescription).Description = updatedBillDescription;

    public void RemoveBill(string projectName, string billDescription) {
        var idx = Bills.FindIndex(b => b.ProjectName == projectName && b.Description == billDescription);
        if (idx >= 0) Bills.RemoveAt(idx);
    }

    public void AttemptRemoveBill(string projectName, string billDescription) {
        // TODO jak w TS
    }

    public string FindBillDate(string projectName, string billDescription)
        => FindBill(projectName, billDescription).Date;

    public bool BillSealed(string projectName, string billDescription)
        => FindBill(projectName, billDescription).Sealed;

    public void AddBillOnBehalf(string projectName, string billDescription, string contributorName) {
        if (!UserExists(contributorName))
            throw new Exception("Failed to add bill on behalf of user, user does not exists.");

        Bills.Add(new Bill {
            ProjectName = projectName,
            Description = billDescription,
            Date = "2000-01-01",
            Sealed = false,
            Owner = contributorName,
            EndAmount = 0,
        });
    }

    private bool UserExists(string name) => RegisteredUsers.Contains(name);

    public string FindBillOwner(string projectName, string billDescription)
        => FindBill(projectName, billDescription).Owner;

    public double FindBillEndAmount(string projectName, string billDescription) {
        if (CurrentUser is null)
            throw new Exception("Failed to find bill end amount, user not logged in.");

        var bill = FindBill(projectName, billDescription);
        if (CurrentUser == bill.Owner) return bill.EndAmount;
        if (IsProjectOwner(CurrentUser, projectName)) return bill.EndAmount;
        return -1;
    }

    private bool IsProjectOwner(string userName, string projectName)
        => ProjectOwners.TryGetValue(projectName, out var owner) && owner == userName;

    private Func<Bill, bool> _filteredBillPredicate = _ => true;

    public void FilterBillsByMember(string userName, bool userIncluded) {
        _filteredBillPredicate = bill => userIncluded == (bill.Owner == userName);
    }

    private List<Bill> FilteredBills()
        => Bills.Where(_filteredBillPredicate).ToList();

    private readonly Dictionary<string, double> _userWallets = new();

    public double FindWalletBalance() {
        ValidateUserLoggedIn("Failed to find wallet balance");
        return _userWallets.TryGetValue(CurrentUser!, out var v) ? v : 0;
    }

    public void WalletDeposit(double amount) {
        ValidateUserLoggedIn("Failed to deposit into wallet");
        _userWallets[CurrentUser!] = FindWalletBalance() + amount;
        _transactions.Add(new DslTransaction("deposit", amount));
    }

    private void ValidateUserLoggedIn(string errorMessage) {
        if (CurrentUser is null)
            throw new Exception($"{errorMessage}, user is not logged in.");
    }

    private readonly List<DslTransaction> _transactions = new();

    public List<DslTransaction> ListWalletTransactions() => _transactions;
}
