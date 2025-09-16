USE [MegaSunCrmDev];

CREATE TABLE [dbo].[UserType]
(
	[UserTypeId] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
	[Name] NVARCHAR(100) NOT NULL,
--	[Status] BIT NOT NULL,
	[IsAdmin] BIT NULL,
	[IsRegularUser] BIT NULL,
	[CreatedBy] UNIQUEIDENTIFIER NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NULL,
	[ModifiedOn] DATETIME NOT NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,
	
	CONSTRAINT UQ_UsersType_Name UNIQUE ([Name])
);

INSERT INTO [dbo].[UserType] 
([Name], [IsAdmin], [isRegularUser], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive])
VALUES
('SuperAdmin', 1, 0, NULL, GETDATE(), NULL, GETDATE(), 1);


CREATE TABLE [dbo].[Users]
(
	[UserId] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
	[Name] VARCHAR(100) NOT NULL,
	[Email] NVARCHAR(100) NOT NULL,
	[Password] NVARCHAR(MAX) NOT NULL,
	[UserTypeId] UNIQUEIDENTIFIER NOT NULL,
	[HashPassword] NVARCHAR(MAX) NOT NULL,
	[Contact] NVARCHAR(20) NOT NULL,
	[ProfileImagePath] NVARCHAR(MAX) NULL,
	[Designation] NVARCHAR(100) NULL,
	[GSTId] NVARCHAR(100) NULL,
--	[UserType] NVARCHAR(100) NULL,
--	[Status] BIT NOT NULL,
	[Address] NVARCHAR(MAX) NULL,
	[CreatedBy] UNIQUEIDENTIFIER NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NULL,
	[ModifiedOn] DATETIME NOT NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT FK_Users_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_Users_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_UserType_UserTypeId FOREIGN KEY ([UserTypeId]) REFERENCES [dbo].[UserType]([UserTypeId]),
	CONSTRAINT UQ_Users_Email UNIQUE ([Email])
);

INSERT INTO [dbo].[Users] 
([Name], [Email], [Password], [UserTypeId], [HashPassword], [Contact], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [isActive])
VALUES
('Admin User', 'admin@gmail.com', 'admin@123', (SELECT UserTypeId FROM UserType WHERE Name = 'SuperAdmin'), '$2a$10$Slyt/06OUZZ40oNdD3COXuSGGgIpyZOqUa9ONIlmXPaIcUY2XGjMG', '9876543210', NULL, GETDATE(),
NULL, GETDATE(), 1);

UPDATE [dbo].[UserType] SET CreatedBy = (SELECT UserId FROM Users WHERE Name = 'Admin User'), 
ModifiedBy = (SELECT UserId FROM Users WHERE Name = 'Admin User');

UPDATE [dbo].[Users] SET CreatedBy = (SELECT UserId FROM Users WHERE Name = 'Admin User'),
ModifiedBy = (SELECT UserId FROM Users WHERE Name = 'Admin User');

ALTER TABLE [dbo].[UserType]
ALTER COLUMN [CreatedBy] UNIQUEIDENTIFIER NOT NULL;

ALTER TABLE [dbo].[UserType]
ALTER COLUMN [ModifiedBy] UNIQUEIDENTIFIER NOT NULL;

ALTER TABLE [dbo].[Users]
ALTER COLUMN [CreatedBy] UNIQUEIDENTIFIER NOT NULL;

ALTER TABLE [dbo].[Users]
ALTER COLUMN [ModifiedBy] UNIQUEIDENTIFIER NOT NULL;

ALTER TABLE [dbo].[UserType]
ADD CONSTRAINT FK_UserType_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]);

ALTER TABLE [dbo].[UserType]
ADD CONSTRAINT FK_UserType_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId]);


CREATE TABLE [dbo].[Permissions]
(
	[PermissionId] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
	[Name] NVARCHAR(100) NOT NULL,
	[Type] NVARCHAR(100) NULL,
	[IconPath] NVARCHAR(MAX) NULL,
	[NavigationPath] NVARCHAR(100) NULL,
	[OrderBy] INT NULL,
	[isDefault] BIT NULL,
	[CreatedBy] UNIQUEIDENTIFIER NOT NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NOT NULL,
	[ModifiedOn] DATETIME NOT NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT FK_Permissions_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_Permissions_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId])

);

INSERT INTO [dbo].[Permissions]
	([Name], [Type], [IconPath], [NavigationPath], [OrderBy], [IsDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive])
VALUES
	('Dashboard', 'Analytics', 'MdOutlineDashboard', '', 0, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1), 
	('My Leads', 'Sales', 'PiUserListBold', '', 1, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	('Followups', 'Sales', 'MdYoutubeSearchedFor', '', 2, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	('Target', 'Sales', 'FiTarget', '', 3, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	('Quotation', 'Sales', 'PiCurrencyCircleDollarLight', '', 4, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	('Orders', 'Sales', 'RiTruckLine', '', 5, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	--('Invoices', 'Sales', 'RiFileList2Line', '', 6, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	('User Management', 'Management', 'BiSolidUserDetail', '', 7, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	('Product Management', 'Management', 'PiCube', '', 8, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1);


CREATE TABLE [dbo].[UserTypePermissionsControl]
(
	[MappingId] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
	[UserTypeId] UNIQUEIDENTIFIER,
	[PermissionId] UNIQUEIDENTIFIER,
	[CreateAccess] BIT NOT NULL,
	[ReadAccess] BIT NOT NULL,
	[UpdateAccess] BIT NOT NULL,
	[DeleteAccess] BIT NOT NULL,
	[CreatedBy] UNIQUEIDENTIFIER NOT NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NOT NULL,
	[ModifiedOn] DATETIME NOT NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT FK_UserTypePermissionsControl_UserTypeId FOREIGN KEY ([UserTypeId]) REFERENCES [dbo].[UserType]([UserTypeId]),
	CONSTRAINT FK_UserTypePermissionsControl_PermissionId FOREIGN KEY ([PermissionId]) REFERENCES [dbo].[Permissions]([PermissionId]),
	CONSTRAINT FK_UserTypePermissionsControl_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_UserTypePermissionsControl_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId])
);


INSERT INTO [dbo].[UserTypePermissionsControl]
	([UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [isActive])
VALUES
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Dashboard'), 0, 1, 0, 0, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'User Management'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'My Leads'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	--((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Invoices'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Quotation'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Followups'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Target'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Orders'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1),
	((SELECT UserTypeId FROM [dbo].[Users] WHERE Name = 'Admin User'), (SELECT PermissionId FROM [dbo].[Permissions] WHERE Name = 'Product Management'), 1, 1, 1, 1, (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), (SELECT UserId FROM [dbo].[Users] WHERE Name = 'Admin User'), GETDATE(), 1);

CREATE TABLE [UserActivityLog]
(
	[LogId] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
	[UserId] UNIQUEIDENTIFIER NULL,
	[ActivityType] NVARCHAR(50) NOT NULL,
	[AttemptedUsername] NVARCHAR(MAX) NOT NULL,
	[LogTimeStamp] DATETIME DEFAULT GETDATE() NOT NULL

	CONSTRAINT FK_UserLoginActivity_UserId FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([UserId])
);
GO;


CREATE OR ALTER PROCEDURE [dbo].[sp_UserLogin]
@Email NVARCHAR(MAX)
AS
BEGIN
	DECLARE @UserId NVARCHAR(100);
	
	-- CASE 1: Both credentials missing
	IF @Email IS NULL OR @Email = '' 
	BEGIN
		SELECT NULL AS [UserId], 'Please enter valid credentials!' AS [Message];
		RETURN;
	END
	
	-- Get UserId from email
	SET @UserId = (SELECT [UserId] FROM [dbo].[Users] WHERE [Email] = @Email AND [IsActive] = 1);
		
	
	-- CASE 2: User found - return user details
	BEGIN
		
		SELECT 
            U.[UserId],
            U.[HashPassword],
            U.[Name],
			U.[ProfileImagePath],
            U.[Email],
            UT.[UserTypeId],
            UT.[IsAdmin],
			UT.[IsRegularUser],
            'Login successful!' AS [Message]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT
		ON U.[UserTypeId] = UT.[UserTypeId]
        WHERE U.[UserId] = @UserId AND U.[IsActive] = 1;
	END
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetPermissions]
@UserTypeId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT P.[PermissionId],
		   P.[Name],
		   P.[Type],
		   P.[IconPath],
		   P.[NavigationPath], 
		   P.[OrderBy],
		   P.[IsDefault],
		   P.[IsActive],
		   UTPC.[CreateAccess],
		   UTPC.[ReadAccess],
		   UTPC.[UpdateAccess],
		   UTPC.[DeleteAccess],
		   UTPC.[IsActive] 
	FROM [dbo].[Permissions] P
	INNER JOIN [dbo].[UserTypePermissionsControl] UTPC
	ON P.[PermissionId] = UTPC.[PermissionId] 
	WHERE UTPC.[UserTypeId] = @UserTypeId
	AND UTPC.[ReadAccess] = 1
	AND P.[IsActive] = 1;

END;
GO;

CREATE TABLE [dbo].[AuditLogs]
(
	[LogId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[TableId] INT NULL,
	[TableName] NVARCHAR(100) NOT NULL,
	[TableKey] NVARCHAR(100) NOT NULL, -- ID OF THE RECORD FOR WHICH THE AUDIT IS GETTING CREATED
	[FieldName] NVARCHAR(100) NOT NULL,
	[PreviousValue] NVARCHAR(MAX) NULL,
	[UpdatedValue] NVARCHAR(MAX) NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NULL,
	[ModifiedOn] DATETIME NULL,
	[BatchId] NVARCHAR(50) NULL,
	[Operation] VARCHAR(1) NULL, -- D - DELETE || I - INSERTED || U - UPDATED
	[TableKey1] NVARCHAR(100) NULL,
	[TableKey2] NVARCHAR(100) NULL
);
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_CreateNewUser]
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @Password NVARCHAR(100),
    @UserTypeId NVARCHAR(100),
    @HashPassword NVARCHAR(MAX),
    @Contact NVARCHAR(20),
    @ProfileImagePath NVARCHAR(MAX),
    @Designation NVARCHAR(MAX),
    @GSTId NVARCHAR(100),
    @Address NVARCHAR(MAX),
    @CreatedBy UNIQUEIDENTIFIER,
    @ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Validate required parameters
    IF @Name IS NULL OR LTRIM(RTRIM(@Name)) = ''
    BEGIN
        SELECT 0 AS Success, 'Name is required.' AS Message;
        RETURN;
    END
    
    IF @Email IS NULL OR LTRIM(RTRIM(@Email)) = ''
    BEGIN
        SELECT 0 AS Success, 'Email is required.' AS Message;
        RETURN;
    END
    
    IF @Password IS NULL OR LTRIM(RTRIM(@Password)) = ''
    BEGIN
        SELECT 0 AS Success, 'Password is required.' AS Message;
        RETURN;
    END
    
    IF @HashPassword IS NULL OR LTRIM(RTRIM(@HashPassword)) = ''
    BEGIN
        SELECT 0 AS Success, 'Hash Password is required.' AS Message;
        RETURN;
    END
    
    IF @Contact IS NULL OR LTRIM(RTRIM(@Contact)) = ''
    BEGIN
        SELECT 0 AS Success, 'Contact is required.' AS Message;
        RETURN;
    END
    
    IF @Address IS NULL OR LTRIM(RTRIM(@Address)) = ''
    BEGIN
        SELECT 0 AS Success, 'Address is required.' AS Message;
        RETURN;
    END
    
    -- Begin Transaction
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- Check if email already exists
        IF EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Email] = @Email)
        BEGIN
            -- Rollback transaction since we're not proceeding
            ROLLBACK TRANSACTION;
            
            SELECT 
                0 AS Success, 
                'User already exists.' AS Message;
            RETURN;
        END
        ELSE
        BEGIN
            -- Insert new user
            INSERT INTO [dbo].[Users]
                ([Name], 
                 [Email], 
                 [Password], 
                 [UserTypeId],
                 [HashPassword],
                 [Contact],
                 [ProfileImagePath],
                 [Designation],
                 [GSTId],
                 [Address],
                 [CreatedBy],
                 [CreatedOn],
                 [ModifiedBy],
                 [ModifiedOn])
            VALUES
                (@Name,
                 @Email,
                 @Password,
                 @UserTypeId,
                 @HashPassword,
                 @Contact,
                 @ProfileImagePath,
                 @Designation,
                 @GSTId,
                 @Address,
                 @CreatedBy,
                 GETDATE(),
                 @ModifiedBy,
                 GETDATE());
            
            -- Commit Transaction on successful insert
            COMMIT TRANSACTION;
            
            -- Success Response
            SELECT 1 AS Success, 'User created successfully.' AS Message;
        END
        
    END TRY
    BEGIN CATCH
        -- Rollback Transaction on error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        -- Failure Response with error details
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message, 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO;

CREATE OR ALTER PROCEDURE [dbo].[sp_GetUsers]
    @SearchParameter NVARCHAR(100) = NULL,
    @LimitParameter INT,
    @OffsetParameter INT,
    @StatusParam BIT = NULL,
    @UserTypeId UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Main query with filters applied dynamically
    SELECT 
        U.[UserId], 
        U.[Name],
        U.[Email],
        U.[UserTypeId],
        U.[Contact],
        U.[ProfileImagePath],
        U.[Designation],
        U.[GSTId],
        U.[Address],
        U.[IsActive],
        UP.[Name] AS [UserType]
    FROM [dbo].[Users] U
    INNER JOIN [dbo].[UserType] UP
        ON U.[UserTypeID] = UP.[UserTypeID]
    WHERE
        -- Search filter (only if search param provided)
        (
            @SearchParameter IS NULL 
            OR LTRIM(RTRIM(@SearchParameter)) = '' 
            OR U.[Name] LIKE '%' + @SearchParameter + '%'
            OR U.[Email] LIKE '%' + @SearchParameter + '%'
            OR U.[Contact] LIKE '%' + @SearchParameter + '%'
        )
        -- Status filter (only if provided)
        AND (
            @StatusParam IS NULL
            OR U.[IsActive] = @StatusParam
        )
        -- UserType filter (only if provided)
        AND (
            @UserTypeId IS NULL
            OR U.[UserTypeId] = @UserTypeId
        )
    ORDER BY U.[Name]
    OFFSET @OffsetParameter ROWS
    FETCH NEXT @LimitParameter ROWS ONLY;

    -- Count query (with same filters)
    SELECT COUNT(*) AS 'Total Count'
    FROM [dbo].[Users] U
    INNER JOIN [dbo].[UserType] UP
        ON U.[UserTypeID] = UP.[UserTypeID]
    WHERE
        (
            @SearchParameter IS NULL 
            OR LTRIM(RTRIM(@SearchParameter)) = '' 
            OR U.[Name] LIKE '%' + @SearchParameter + '%'
            OR U.[Email] LIKE '%' + @SearchParameter + '%'
            OR U.[Contact] LIKE '%' + @SearchParameter + '%'
        )
        AND (
            @StatusParam IS NULL
            OR U.[IsActive] = @StatusParam
        )
        AND (
            @UserTypeId IS NULL
            OR U.[UserTypeId] = @UserTypeId
        );
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserTypeNames]
AS
BEGIN
	SELECT [UserTypeId], [Name] FROM [dbo].[UserType]; 
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserByUserId]
@UserId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT Users.[UserId], 
		Users.[Name],
		Users.[Email],
		UserType.[Name] AS [UserType],
		Users.[Contact],
		Users.[ProfileImagePath],
		Users.[Designation],
		Users.[UserTypeId],
		Users.[Address],
		Users.[IsActive],
		Users.[CreatedOn]
	FROM [dbo].[Users]  
	INNER JOIN [dbo].[UserType]
	ON Users.[UserTypeId] = UserType.[UserTypeId]
	WHERE Users.[UserId] = @UserId;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_CreateUserType]
	@Name NVARCHAR(100),
	@IsAdmin BIT,
	@IsRegularUser BIT,
	@CreatedBy UNIQUEIDENTIFIER,
	@ModifiedBy UNIQUEIDENTIFIER,

	------- LEAD ACCESS DECLARATION ------------
	@LeadReadAccess BIT = 0,
	@LeadCreateAccess BIT = 0,
	@LeadUpdateAccess BIT = 0,
	@LeadDeleteAccess BIT = 0,
	
	------- DASHBOARD ACCESS DECLARATION ------------
	@DashboardReadAccess BIT = 1,
	@DashboardCreateAccess BIT = 1,
	@DashboardUpdateAccess BIT = 1,
	@DashboardDeleteAccess BIT = 1,
	
	------- INVOICES ACCESS DECLARATION ------------
--	@InvoiceReadAccess BIT = 1,
--	@InvoiceCreateAccess BIT = 1,
--	@InvoiceUpdateAccess BIT = 1,
--	@InvoiceDeleteAccess BIT = 1,
	
	------- QUOTATION ACCESS DECLARATION ------------
	@QuotationReadAccess BIT = 0,
	@QuotationCreateAccess BIT = 0,
	@QuotationUpdateAccess BIT = 0,
	@QuotationDeleteAccess BIT = 0,

	------- USER MANAGEMENT ACCESS DECLARATION ------------
	@UserReadAccess BIT = 0,
	@UserCreateAccess BIT = 0,
	@UserUpdateAccess BIT = 0,
	@UserDeleteAccess BIT = 0,

	------- FOLLOWUPS ACCESS DECLARATION ------------
	@FollowUpsReadAccess BIT = 0,
	@FollowUpsCreateAccess BIT = 0,
	@FollowUpsUpdateAccess BIT = 0,
	@FollowUpsDeleteAccess BIT = 0,
	
	------- TARGET ACCESS DECLARATION ------------
	@TargetReadAccess BIT = 0,
	@TargetCreateAccess BIT = 0,
	@TargetUpdateAccess BIT = 0,
	@TargetDeleteAccess BIT = 0,
	
	------- ORDERS ACCESS DECLARATION ------------
	@OrdersReadAccess BIT = 0,
	@OrdersCreateAccess BIT = 0,
	@OrdersUpdateAccess BIT = 0,
	@OrdersDeleteAccess BIT = 0,

	------- PRODUCT MANAGEMENT ACCESS DECLARATION ------------
	@ProductReadAccess BIT = 0,
	@ProductCreateAccess BIT = 0,
	@ProductUpdateAccess BIT = 0,
	@ProductDeleteAccess BIT = 0
	
AS
BEGIN
	SET NOCOUNT ON;
	
	DECLARE @UserTypeId UNIQUEIDENTIFIER;
	
	BEGIN TRY
		-- Check if name already exists
		IF EXISTS (SELECT 1 FROM [dbo].[UserType] WHERE [Name] = @Name)
		BEGIN
			SELECT 
				0 AS Success,
				'User Type already exists.' AS Message;
			RETURN;
		END

		-- Validate input parameters
		IF @IsAdmin = 0 AND @IsRegularUser = 0
		BEGIN
			SELECT 0 AS Success, 'User Creation Failed, Please check access related values' AS Message;
			RETURN;
		END

		IF @IsAdmin = 1 AND @IsRegularUser = 1
		BEGIN
			SELECT 0 AS Success, 'User Creation Failed, Please check access related values' AS Message;
			RETURN;
		END

		-- Begin Transaction
		BEGIN TRANSACTION;

		-- Insert UserType record
		INSERT INTO [dbo].[UserType]
			([Name],
			[IsAdmin],
			[IsRegularUser],
			[CreatedBy],
			[CreatedOn],
			[ModifiedBy],
			[ModifiedOn],
			[IsActive])
		VALUES
			(@Name,
			@IsAdmin,
			@IsRegularUser,
			@CreatedBy,
			GETDATE(),
			@ModifiedBy,
			GETDATE(),
			1);

		-- Get the newly created UserTypeId
		SET @UserTypeId = (SELECT [UserTypeId] FROM [dbo].[UserType] WHERE [Name] = @Name);

		-- Set Admin permissions if IsAdmin = 1
		IF @IsAdmin = 1 AND @IsRegularUser = 0
		BEGIN
			SET @LeadCreateAccess = 1;
			SET @LeadReadAccess = 1;
			SET @LeadUpdateAccess = 1;
			SET @LeadDeleteAccess = 1;

--			SET @InvoiceCreateAccess = 1;
--			SET @InvoiceReadAccess = 1;
--			SET @InvoiceUpdateAccess = 1;
--			SET @InvoiceDeleteAccess = 1;

			SET @QuotationCreateAccess = 1;
			SET @QuotationReadAccess = 1;
			SET @QuotationUpdateAccess = 1;
			SET @QuotationDeleteAccess = 1;

			SET @UserCreateAccess = 1;
			SET @UserReadAccess = 1;
			SET @UserUpdateAccess = 1;
			SET @UserDeleteAccess = 1;

			SET @FollowUpsCreateAccess = 1;
			SET @FollowUpsReadAccess = 1;
			SET @FollowUpsUpdateAccess = 1;
			SET @FollowUpsDeleteAccess = 1;

			SET @TargetCreateAccess = 1;
			SET @TargetReadAccess = 1;
			SET @TargetUpdateAccess = 1;
			SET @TargetDeleteAccess = 1;

			SET @OrdersCreateAccess = 1;
			SET @OrdersReadAccess = 1;
			SET @OrdersUpdateAccess = 1;
			SET @OrdersDeleteAccess = 1;

			SET @ProductCreateAccess = 1;
			SET @ProductReadAccess = 1;
			SET @ProductUpdateAccess = 1;
			SET @ProductDeleteAccess = 1;

			SET @DashboardCreateAccess = 1;
			SET @DashboardReadAccess = 1;
			SET @DashboardUpdateAccess = 1;
			SET @DashboardDeleteAccess = 1;
		END

		-- Insert permissions for the user type
		INSERT INTO [dbo].[UserTypePermissionsControl]
			([UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [isActive])
		VALUES
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Dashboard'), @DashboardCreateAccess, @DashboardReadAccess, @DashboardUpdateAccess, @DashboardDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'My Leads'), @LeadCreateAccess, @LeadReadAccess, @LeadUpdateAccess, @LeadDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			--(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Invoices'), @InvoiceCreateAccess, @InvoiceReadAccess, @InvoiceUpdateAccess, @InvoiceDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Quotation'), @QuotationCreateAccess, @QuotationReadAccess, @QuotationUpdateAccess, @QuotationDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'User Management'), @UserCreateAccess, @UserReadAccess, @UserUpdateAccess, @UserDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Followups'), @FollowUpsCreateAccess, @FollowUpsReadAccess, @FollowUpsUpdateAccess, @FollowUpsDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Target'), @TargetCreateAccess, @TargetReadAccess, @TargetUpdateAccess, @TargetDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Orders'), @OrdersCreateAccess, @OrdersReadAccess, @OrdersUpdateAccess, @OrdersDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE Name = 'Product Management'), @ProductCreateAccess, @ProductReadAccess, @ProductUpdateAccess, @ProductDeleteAccess, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), 1);

		-- Commit Transaction
		COMMIT TRANSACTION;

		-- Success Message
		IF @IsAdmin = 1 AND @IsRegularUser = 0
		BEGIN
			SELECT 1 AS Success, 'User Type (Admin) created successfully' AS Message;
		END
		ELSE IF @IsAdmin = 0 AND @IsRegularUser = 1
		BEGIN
			SELECT 1 AS Success, 'User Type (Regular) created successfully' AS Message;
		END

	END TRY
	BEGIN CATCH
		-- Rollback Transaction on error
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			
		-- Failure Response with error details
		SELECT 
			0 AS Success,
			ERROR_MESSAGE() AS Message,
			ERROR_NUMBER() AS ErrorNumber,
			ERROR_SEVERITY() AS ErrorSeverity,
			ERROR_STATE() AS ErrorState;
	END CATCH

END;
GO
CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateUserByUserID]
@Name NVARCHAR(100),
@UserId UNIQUEIDENTIFIER,
@Email NVARCHAR(100),
@UserTypeId UNIQUEIDENTIFIER,
@Contact NVARCHAR(20),
@ProfileImagePath NVARCHAR(MAX),
@Designation NVARCHAR(100),
@IsActive BIT,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    
    BEGIN TRY
        -- Check if email or contact already exists for another user
        IF EXISTS (
            SELECT 1 
            FROM [dbo].[Users] 
            WHERE ([Email] = @Email OR [Contact] = @Contact)
              AND [UserId] <> @UserId
        )
        BEGIN
            SELECT 0 AS Success, 'Email or Contact already exists for another user.' AS Message;
            RETURN;
        END

        BEGIN TRANSACTION;

        UPDATE [dbo].[Users]
        SET [Name] = @Name,
            [Email] = @Email,
            [UserTypeId] = @UserTypeId,
            [Contact] = @Contact,
            [ProfileImagePath] = @ProfileImagePath,
            [Designation] = @Designation,
            [IsActive] = @IsActive,
            [ModifiedOn] = GETDATE(),
            [ModifiedBy] = @ModifiedBy
        WHERE [UserId] = @UserId;

        IF @@ROWCOUNT = 0
        BEGIN
            -- No rows updated = user not found
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'User not found.' AS Message;
            RETURN;
        END

        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'User updated successfully.' AS Message;
    END TRY

    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message, 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_UpdatePassword]
@UserId UNIQUEIDENTIFIER,
@Password NVARCHAR(100),
@HashPassword NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
	BEGIN TRANSACTION
		IF EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserID] = @UserID)
		BEGIN
			UPDATE [dbo].[Users]
			SET [Password] = @Password,
			[HashPassword] = @HashPassword
			WHERE [UserId] = @UserId;

			COMMIT TRANSACTION;
			SELECT 1 AS Success, 'Password Updated Successfully' AS Message;
		END
		ELSE
		BEGIN
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success, 'Update process failed' AS Message;
		END
	
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 
				0 AS Success,
				ERROR_MESSAGE() AS Message, 
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO;

CREATE OR ALTER TRIGGER [dbo].[Trg_Users]
ON [dbo].[Users]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Users]'
DECLARE @TableID INT = '1'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.UserID = DELETED.UserID))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'Email', NULL, INSERTED.[Email], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'UserTypeID', NULL, INSERTED.[UserTypeID], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'HashPassword', NULL, INSERTED.[HashPassword], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'Password', NULL, INSERTED.[Password], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'Contact', NULL, INSERTED.[Contact], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'ProfileImagePath', NULL, INSERTED.[ProfileImagePath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'Designation', NULL, INSERTED.[Designation], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'GSTID', NULL, INSERTED.[GSTID], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'Address', NULL, INSERTED.[Address], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserID], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.UserID = DELETED.UserID)
	BEGIN
		IF UPDATE ([Name])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[Name], '') <> ISNULL(DELETED.[Name], '')
			END

		IF UPDATE ([Email])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'Email', DELETED.[Email], INSERTED.[Email], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[Email], '') <> ISNULL(DELETED.[Email], '')
			END

		IF UPDATE ([UserTypeID])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'UserTypeID', DELETED.[UserTypeId], INSERTED.[UserTypeId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[UserTypeID], '') <> ISNULL(DELETED.[UserTypeID], '')
			END

		IF UPDATE ([HashPassword])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'HashPassword', DELETED.[HashPassword], INSERTED.[HashPassword], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[HashPassword], '') <> ISNULL(DELETED.[HashPassword], '')
			END

		IF UPDATE ([Password])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'Password', DELETED.[Password], INSERTED.[Password], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[Password], '') <> ISNULL(DELETED.[Password], '')
			END

		IF UPDATE ([Contact])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'Contact', DELETED.[Contact], INSERTED.[Contact], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[Contact], '') <> ISNULL(DELETED.[Contact], '')
			END

		IF UPDATE ([ProfileImagePath])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'ProfileImagePath', DELETED.[ProfileImagePath], INSERTED.[ProfileImagePath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[ProfileImagePath], '') <> ISNULL(DELETED.[ProfileImagePath], '')
			END

		IF UPDATE ([Designation])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'Designation', DELETED.[Designation], INSERTED.[Designation], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[Designation], '') <> ISNULL(DELETED.[Designation], '')
			END

		IF UPDATE ([GSTID])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'GSTID', DELETED.[GSTID], INSERTED.[GSTID], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[GSTID], '') <> ISNULL(DELETED.[GSTID], '')
			END

		IF UPDATE ([Address])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'Address', DELETED.[Address], INSERTED.[Address], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[Address], '') <> ISNULL(DELETED.[Address], '')
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserID], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserID] = DELETED.[UserID]
				WHERE ISNULL(INSERTED.[IsActive], '') <> ISNULL(DELETED.[IsActive], '')
			END
	END
END;
GO

ALTER TABLE [dbo].[Users] ENABLE TRIGGER [Trg_Users];
GO

CREATE OR ALTER TRIGGER [dbo].[Trg_UserType]
ON [dbo].[UserType]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[UserType]'
DECLARE @TableID INT = '2'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.UserTypeID = DELETED.UserTypeID))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserTypeID], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserTypeID], 'IsAdmin', NULL, INSERTED.[IsAdmin], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserTypeID], 'IsRegularUser', NULL, INSERTED.[IsRegularUser], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[UserTypeID], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.UserTypeID = DELETED.UserTypeID)
	BEGIN
		IF UPDATE ([Name])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserTypeID], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserTypeID] = DELETED.[UserTypeID]
				WHERE ISNULL(INSERTED.[Name], '') <> ISNULL(DELETED.[Name], '')
			END

		IF UPDATE ([IsAdmin])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserTypeID], 'IsAdmin', DELETED.[IsAdmin], INSERTED.[IsAdmin], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserTypeID] = DELETED.[UserTypeID]
				WHERE ISNULL(INSERTED.[IsAdmin], '') <> ISNULL(DELETED.[IsAdmin], '')
			END

		IF UPDATE ([IsRegularUser])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserTypeID], 'IsRegularUser', DELETED.[IsRegularUser], INSERTED.[IsRegularUser], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserTypeID] = DELETED.[UserTypeID]
				WHERE ISNULL(INSERTED.[IsRegularUser], '') <> ISNULL(DELETED.[IsRegularUser], '')
			END

		IF UPDATE (IsActive)
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[UserTypeID], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[UserTypeID] = DELETED.[UserTypeID]
				WHERE ISNULL(INSERTED.[IsActive], '') <> ISNULL(DELETED.[IsActive], '')
			END
	END
END;
GO

ALTER TABLE [dbo].[UserType] ENABLE TRIGGER [Trg_UserType];
GO

CREATE OR ALTER TRIGGER [dbo].[Trg_Permissions]
ON [dbo].[Permissions]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Permissions]'
DECLARE @TableID INT = '3'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.PermissionID = DELETED.PermissionID))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'Type', NULL, INSERTED.[Type], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'IconPath', NULL, INSERTED.[IconPath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'NavigationPath', NULL, INSERTED.[NavigationPath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'OrderBy', NULL, INSERTED.[OrderBy], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'IsDefault', NULL, INSERTED.[isDefault], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[PermissionId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.PermissionID = DELETED.PermissionID)
	BEGIN
		IF UPDATE ([Name])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[Name], '') <> ISNULL(DELETED.[Name], '')
			END

		IF UPDATE ([Type])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'Type', DELETED.[Type], INSERTED.[Type], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[Type], '') <> ISNULL(DELETED.[Type], '')
			END

		IF UPDATE ([IconPath])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'IconPath', DELETED.[IconPath], INSERTED.[IconPath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[IconPath], '') <> ISNULL(DELETED.[IconPath], '')
			END

		IF UPDATE ([NavigationPath])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'NavigationPath', DELETED.[NavigationPath], INSERTED.[NavigationPath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[NavigationPath], '') <> ISNULL(DELETED.[NavigationPath], '')
			END

		IF UPDATE ([OrderBy])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'OrderBy', DELETED.[OrderBy], INSERTED.[OrderBy], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[OrderBy], '') <> ISNULL(DELETED.[OrderBy], '')
			END

		IF UPDATE ([IsDefault])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'IsDefault', DELETED.[isDefault], INSERTED.[isDefault], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[isDefault], '') <> ISNULL(DELETED.[isDefault], '')
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[PermissionId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[PermissionId] = DELETED.[PermissionId]
				WHERE ISNULL(INSERTED.[IsActive], '') <> ISNULL(DELETED.[IsActive], '')
			END
	END
END;
GO

ALTER TABLE [dbo].[Permissions] ENABLE TRIGGER [Trg_Permissions];
GO

CREATE OR ALTER TRIGGER [dbo].[Trg_UserTypePermissionsControl]
ON [dbo].[UserTypePermissionsControl]
FOR INSERT
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[UserTypePermissionsControl]'
DECLARE @TableID INT = '4'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.MappingId = DELETED.MappingId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'UserTypeId', NULL, INSERTED.[UserTypeId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'PermissionId', NULL, INSERTED.[PermissionId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'CreateAccess', NULL, INSERTED.[CreateAccess], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ReadAccess', NULL, INSERTED.[ReadAccess], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'UpdateAccess', NULL, INSERTED.[UpdateAccess], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'DeleteAccess', NULL, INSERTED.[DeleteAccess], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

 	END
END;
GO

ALTER TABLE [dbo].[UserTypePermissionsControl] ENABLE TRIGGER [Trg_UserTypePermissionsControl];

UPDATE [dbo].[Permissions] 
SET IconPath = '/icons/Quotation.png' WHERE Name = 'Quotation';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/Target.png' WHERE NAME = 'Target';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/User_Management.png' WHERE NAME = 'User Management';

--UPDATE [dbo].[Permissions]
--SET IconPath = '/icons/Invoices.png' WHERE NAME = 'Invoices';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/Follow-ups.png' WHERE NAME = 'Followups';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/Dashboard.png' WHERE NAME = 'Dashboard';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/Leads.png' WHERE NAME = 'My Leads';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/Product_Management.png' WHERE NAME = 'Product Management';

UPDATE [dbo].[Permissions]
SET IconPath = '/icons/Delivery.png' WHERE NAME = 'Orders';


UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/quotation'
WHERE [Name] = 'Quotation';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/target'
WHERE [Name] = 'Target';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/usermanagement'
WHERE [Name] = 'User Management';

--UPDATE [dbo].[Permissions]
--SET [NavigationPath] = '/invoices'
--WHERE [Name] = 'Invoices';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/followups'
WHERE [Name] = 'Followups';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/'
WHERE [Name] = 'Dashboard';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/myleads'
WHERE [Name] = 'My Leads';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/productmanagement'
WHERE [Name] = 'Product Management';

UPDATE [dbo].[Permissions]
SET [NavigationPath] = '/orders'
WHERE [Name] = 'Orders';

CREATE TABLE [dbo].[RefreshTokens] (
	[Id] INT IDENTITY PRIMARY KEY,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[Token] NVARCHAR(500) NOT NULL,
	[ExpiryDate] DATETIME NOT NULL,
	FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([UserId]));

END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_DeleteRefreshToken]
@Token NVARCHAR(500)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM [dbo].[RefreshTokens] WHERE [Token] = @Token)
	BEGIN
		BEGIN TRY
		BEGIN TRANSACTION
			DELETE FROM [dbo].[RefreshTokens] 
			WHERE [Token] = @Token;

			SELECT 1 AS Success, 'Delete Token Successful' AS Message;
		COMMIT TRANSACTION
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;

				SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
		END CATCH
	END
	ELSE
    BEGIN
        -- Token doesn't exist
        SELECT 0 AS Success, 'Token not found' AS Message;
    END
END;
GO
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserTypes]
@UserTypeId UNIQUEIDENTIFIER
AS
BEGIN
	IF (SELECT [IsAdmin] FROM [dbo].[UserType] WHERE [UserTypeId] = @UserTypeId) = 1
	BEGIN
		SELECT [Name],
			[UserTypeId],
			[IsAdmin],
			[IsRegularUser],
			[IsActive]
		FROM
			[dbo].[UserType];
		SELECT 1 AS Success, 'Data Request Successful' AS Message;
	END
	ELSE
	BEGIN
		SELECT 0 AS Success, 'Unauthorized Access Request' AS Message;
	END
END;
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateUserTypeByUserTypeId]
@UserTypeId UNIQUEIDENTIFIER,
@UserId UNIQUEIDENTIFIER,

@Name NVARCHAR(100),
@IsAdmin BIT,	
@IsRegularUser BIT,
@ModifiedBy UNIQUEIDENTIFIER,
@IsActive BIT,

------- LEAD ACCESS DECLARATION ------------
@LeadReadAccess BIT,
@LeadCreateAccess BIT,
@LeadUpdateAccess BIT,
@LeadDeleteAccess BIT,
	
------- QUOTATION ACCESS DECLARATION ------------
@QuotationReadAccess BIT,
@QuotationCreateAccess BIT,
@QuotationUpdateAccess BIT,
@QuotationDeleteAccess BIT,

------- USER MANAGEMENT ACCESS DECLARATION ------------
@UserReadAccess BIT,
@UserCreateAccess BIT,
@UserUpdateAccess BIT,
@UserDeleteAccess BIT,

------- FOLLOWUPS ACCESS DECLARATION ------------
@FollowUpsReadAccess BIT,
@FollowUpsCreateAccess BIT,
@FollowUpsUpdateAccess BIT,
@FollowUpsDeleteAccess BIT,
	
------- TARGET ACCESS DECLARATION ------------
@TargetReadAccess BIT,
@TargetCreateAccess BIT,
@TargetUpdateAccess BIT,
@TargetDeleteAccess BIT,
	
------- ORDERS ACCESS DECLARATION ------------
@OrdersReadAccess BIT,
@OrdersCreateAccess BIT,
@OrdersUpdateAccess BIT,
@OrdersDeleteAccess BIT,

------- PRODUCT MANAGEMENT ACCESS DECLARATION ------------
@ProductReadAccess BIT,
@ProductCreateAccess BIT,
@ProductUpdateAccess BIT,
@ProductDeleteAccess BIT

AS
BEGIN
	IF (SELECT UserType.[IsAdmin] FROM [dbo].Users 
			INNER JOIN [dbo].[UserType] 
				ON Users.[UserTypeId] = UserType.[UserTypeId] 
					WHERE Users.[UserId] = @UserId) = 1
	BEGIN
		BEGIN TRANSACTION
		BEGIN TRY
			IF @IsAdmin = 1 AND @IsRegularUser = 0
			BEGIN
				UPDATE [dbo].[UserType]
				SET [Name] = @Name,
					[ModifiedBy] = @ModifiedBy,
					[ModifiedOn] = GETDATE(),
					[IsActive] = @IsActive
				WHERE 
					[UserTypeId] = @UserTypeId;


				SELECT 1 AS Success, 'Update Successful' AS Message;
			END
			ELSE IF @IsAdmin = 0 AND @IsRegularUser = 1
			BEGIN
				UPDATE [dbo].[UserType]
				SET [Name] = @Name,
					[ModifiedBy] = @ModifiedBy,
					[ModifiedOn] = GETDATE(),
					[IsActive] = @IsActive
				WHERE 
					[UserTypeId] = @UserTypeId;

				UPDATE [dbo].[UserTypePermissionsControl]
				SET [ReadAccess] = @LeadReadAccess,					[UpdateAccess] = @LeadUpdateAccess,				[CreateAccess] = @LeadCreateAccess,				[DeleteAccess] = @LeadDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'My Leads');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @QuotationReadAccess,			[UpdateAccess] = @QuotationUpdateAccess,		[CreateAccess] = @QuotationCreateAccess,		[DeleteAccess] = @QuotationDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Quotation');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @UserReadAccess,					[UpdateAccess] = @UserUpdateAccess,				[CreateAccess] = @UserCreateAccess, 			[DeleteAccess] = @UserDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'User Management');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @TargetReadAccess,				[UpdateAccess] = @TargetUpdateAccess,			[CreateAccess] = @TargetCreateAccess, 			[DeleteAccess] = @TargetDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Target');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @FollowupsReadAccess,			[UpdateAccess] = @FollowupsUpdateAccess,	    [CreateAccess] = @FollowupsCreateAccess,		[DeleteAccess] = @FollowupsDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Followups');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @OrdersReadAccess,				[UpdateAccess] = @OrdersUpdateAccess,			[CreateAccess] = @OrdersCreateAccess,			[DeleteAccess] = @OrdersDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Order Management');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @ProductReadAccess,				[UpdateAccess] = @ProductUpdateAccess,			[CreateAccess] = @ProductCreateAccess,			[DeleteAccess] = @ProductDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Product Management');
				
				
				SELECT 1 AS Success, 'Update Successful' AS Message;
			END
			ELSE IF @IsAdmin = 0 AND @IsRegularUser = 0
			BEGIN
				SELECT 0 AS Success, 'Update Failed, Please check conditions' AS Message;
			END
			ELSE IF @IsAdmin = 1 AND @IsRegularUser = 1
			BEGIN
				SELECT 0 AS Success, 'Update Failed, Please check conditions' AS Message;
			END
			ELSE
			BEGIN
				SELECT 0 AS Success, 'Update Failed, Please check conditions' AS Message;
			END

				
			COMMIT TRANSACTION;
			SELECT 1 AS Success , 'Update Successful' AS Message;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success , ERROR_MESSAGE() AS Message;
		END CATCH
		
	END
	ELSE
	BEGIN
		SELECT 0 AS Success, 'Unauthorized Update Request Found' AS Message;
	END
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserTypeByUserTypeId]
@UserId UNIQUEIDENTIFIER,
@UserTypeId UNIQUEIDENTIFIER
AS
BEGIN
	IF (SELECT UserType.[IsAdmin] FROM [dbo].[Users] INNER JOIN [dbo].[UserType] ON Users.[UserTypeId] = UserType.[UserTypeId] WHERE Users.[UserId] = @UserId) = 1
	BEGIN
		SELECT UserType.[UserTypeId],
			UserType.[Name],
			UserType.[IsAdmin],
			UserType.[IsRegularUser],
			UserType.[CreatedOn],
			UserType.[CreatedBy],
			UserType.[IsActive]
		FROM [dbo].[UserType]
		WHERE UserType.[UserTypeId] = @UserTypeId;

		SELECT Control.[PermissionId],
			Control.[CreateAccess],
			Control.[ReadAccess],
			Control.[UpdateAccess],
			Control.[DeleteAccess],
			Permission.[Name],
			Permission.[Type]
		FROM [dbo].[UserTypePermissionsControl] Control 
			INNER JOIN [dbo].[Permissions] Permission
				ON Control.[PermissionId] = Permission.[PermissionId]
				
			INNER JOIN [dbo].[UserType] UserType
				ON Control.[UserTypeId] = UserType.[UserTypeId]
				
		WHERE UserType.[UserTypeId] = @UserTypeId;

		-- DASHBOARD GET LIST BY USERTYPE ID
		SELECT 1 AS 'Leads Card',  
			1 AS 'Followups Card',
			1 AS 'Targets Card',
			1 AS 'Quotations Card',
			1 AS 'Invoices Card';


		SELECT 1 AS Success, 'Data Request Successful' AS Message;

	END

	ELSE
	BEGIN
		SELECT 0 AS Success, 'Unauthorized Access Found' AS Message;
	END
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetPermissionNames]
AS
BEGIN 
	SELECT [PermissionId],
			[Name]
	FROM [dbo].[Permissions]; 
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateProfileImage]
@UserId UNIQUEIDENTIFIER,
@ProfileImagePath NVARCHAR(MAX)
AS 
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @UserId)
        BEGIN
            BEGIN TRANSACTION;

            UPDATE [dbo].[Users]
            SET [ProfileImagePath] = @ProfileImagePath
            WHERE [UserId] = @UserId;

            COMMIT TRANSACTION;

            SELECT 1 AS Success, 'Profile Image Updated Successfully' AS Message;
        END
        ELSE
        BEGIN
            -- No transaction here since we didn’t start one
            SELECT 0 AS Success, 'UserId not found, update failed' AS Message;
        END
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message, 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO

CREATE TABLE [dbo].[LeadSource]
(
	[LeadSourceId] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
	[Name] NVARCHAR(100) NOT NULL,
	[IsActive] BIT NOT NULL,
	[IsDeleted] BIT NOT NULL,
	[CreatedBy] UNIQUEIDENTIFIER NOT NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NOT NULL,
	[ModifiedOn] DATETIME NOT NULL,

	CONSTRAINT FK_LeadSource_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_LeadSource_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId])
);
GO

CREATE TABLE [dbo].[LeadType]
(
	[LeadTypeId] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
	[Name] NVARCHAR(100) NOT NULL,
	[IsActive] BIT NOT NULL,
	[IsDeleted] BIT NOT NULL,
	[CreatedBy] UNIQUEIDENTIFIER NOT NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NOT NULL,
	[ModifiedOn] DATETIME NOT NULL,
	
	CONSTRAINT FK_LeadType_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_LeadType_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId])
);
GO

CREATE TABLE [dbo].[LeadStatus]
(
	[LeadStatusId] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
	[Name] NVARCHAR(100) NOT NULL,
	[IsActive] BIT NOT NULL,
	[IsDeleted] BIT NOT NULL,
	[CreatedBy] UNIQUEIDENTIFIER NOT NULL,
	[CreatedOn] DATETIME NOT NULL,
	[ModifiedBy] UNIQUEIDENTIFIER NOT NULL,
	[ModifiedOn] DATETIME NOT NULL,
	
	CONSTRAINT FK_LeadStatus_CreatedBy FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),
	CONSTRAINT FK_LeadStatus_ModifiedBy FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId])
);
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_CreateLeadSource]
@Name NVARCHAR(100),
@IsActive BIT,
@CreatedBy UNIQUEIDENTIFIER
AS
BEGIN	
	BEGIN TRY
		IF LTRIM(RTRIM(@Name)) = '' AND @Name IS NULL
		BEGIN
			SELECT 0 AS Success, 'Please enter a valid name' AS Message;
		END
		ELSE
		BEGIN
			IF EXISTS (SELECT 1 FROM [dbo].[LeadSource] WHERE [Name] = LTRIM(RTRIM(@Name)) AND [IsDeleted] = 0)
			BEGIN
				SELECT 0 AS Success, 'Lead Source already exists!' AS Message;
			END
			ELSE IF EXISTS (SELECT 1 FROM [dbo].[LeadSource] WHERE [Name] = LTRIM(RTRIM(@Name)) AND [IsDeleted] = 1 AND [IsActive] = 0)
			BEGIN
				UPDATE [dbo].[LeadSource]
					SET [IsDeleted] = 0,
						[IsActive] = 1
						WHERE [Name] = @Name;
					
				SELECT 1 AS Success, 'Lead Source Existed, Re-activated!' AS Message;
			END
			ELSE
			BEGIN
				BEGIN TRANSACTION
					INSERT INTO [dbo].[LeadSource]
						([Name], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
					VALUES
						(LTRIM(RTRIM(@Name)), @IsActive, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());

					SELECT 1 AS Success, 'Lead Source Created Successfully!' AS Message;
				COMMIT TRANSACTION;
			END
		END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;

			SELECT 
				0 AS Success,
				ERROR_MESSAGE() AS Message, 
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateLeadSource]
@LeadSourceId UNIQUEIDENTIFIER,
@Name NVARCHAR(100),
@IsActive BIT,
@ModifiedBy UNIQUEIDENTIFIER
AS 
BEGIN
	IF LTRIM(RTRIM(@Name)) = '' AND @Name IS NULL
	BEGIN
		SELECT 0 AS Success, 'Please enter a valid name!' AS Message;
	END
	ELSE IF EXISTS (
		SELECT 1 
		FROM [dbo].[LeadSource] 
		WHERE [Name] = LTRIM(RTRIM(@Name)) 
			AND [LeadSourceId] <> @LeadSourceId 
			AND [IsDeleted] = 0
	)
	BEGIN 
		SELECT 0 AS Success, 'Please enter a unique name!' AS Message;
	END
	ELSE IF NOT EXISTS (
		SELECT 1 
		FROM [dbo].[LeadSource] 
		WHERE [LeadSourceId] = @LeadSourceId 
			AND [IsDeleted] = 0
	)
	BEGIN
		SELECT 0 AS Success, 'Please alter a valid record!' AS Message; 
	END
	ELSE
	BEGIN TRY
		BEGIN TRANSACTION;

			UPDATE [dbo].[LeadSource]
			SET [Name] = LTRIM(RTRIM(@Name)),
				[IsActive] = @IsActive,
				[ModifiedBy] = @ModifiedBy,
				[ModifiedOn] = GETDATE()
			WHERE [LeadSourceId] = @LeadSourceId;

		COMMIT TRANSACTION;

		SELECT 1 AS Success, 'Lead Source Updated Successfully!' AS Message;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;

		SELECT 
			0 AS Success,
			ERROR_MESSAGE() AS Message,
			ERROR_NUMBER() AS ErrorNumber,
			ERROR_SEVERITY() AS ErrorSeverity,
			ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetLeadSource]
AS 
BEGIN
	SELECT [LeadSourceId], 
			[Name],
			[IsActive] AS [Status]
		FROM [dbo].[LeadSource]
		WHERE [IsDeleted] = 0;
	SELECT 1 AS Success, 'Data retrieval successful' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_DeleteLeadSource]
@LeadSourceId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
	BEGIN TRANSACTION
		UPDATE [dbo].[LeadSource]
		SET [IsDeleted] = 1,
		[IsActive] = 0,
		[ModifiedBy] = @ModifiedBy,
		[ModifiedOn] = GETDATE()
			WHERE [LeadSourceId] = @LeadSourceId;

		COMMIT TRANSACTION;
		SELECT 1 AS success, 'Deletion successful' AS Message;
		
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION;
		SELECT 0 AS Success,
			ERROR_MESSAGE() AS Message, 
			ERROR_NUMBER() AS ErrorNumber,
			ERROR_SEVERITY() AS ErrorSeverity,
			ERROR_STATE() AS ErrorState;
				
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_CreateLeadType]
@Name NVARCHAR(100),
@CreatedBy UNIQUEIDENTIFIER,
@IsActive BIT
AS
BEGIN
	BEGIN TRY
		IF LTRIM(RTRIM(@Name)) = '' AND @Name IS NULL
		BEGIN
			SELECT 0 AS Success, 'Please enter a valid name' AS Message;
		END
		ELSE IF @IsActive IS NULL OR LTRIM(RTRIM(@IsActive)) = ''
		BEGIN
			SELECT 0 AS Success, 'Invalid Status provided' AS Message;
		END
		ELSE IF EXISTS (SELECT 1 FROM [dbo].[LeadType] WHERE [Name] = @Name AND [IsDeleted] = 0)
		BEGIN
			SELECT 0 AS Success, 'Same Status Type exists' AS Message;
		END
		ELSE IF EXISTS (SELECT 1 FROM [dbo].[LeadType] WHERE [Name] = LTRIM(RTRIM(@Name)) AND [IsDeleted] = 1 AND [IsActive] = 0)
		BEGIN
			UPDATE [dbo].[LeadType]
				SET [IsDeleted] = 0,
					[IsActive] = 1
					WHERE [Name] = @Name;
					
			SELECT 1 AS Success, 'Lead Type Existed, Re-activated!' AS Message;
		END
		ELSE
		BEGIN
			BEGIN TRANSACTION
			INSERT INTO [dbo].[LeadType] 
				([Name], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
			VALUES
				(@Name, @IsActive, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());

			COMMIT TRANSACTION;
			SELECT 1 AS Success, 'Creation successful' AS Message;
		END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateLeadType]
@LeadTypeId UNIQUEIDENTIFIER,
@Name NVARCHAR(100),
@IsActive BIT,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
		IF LTRIM(RTRIM(@Name)) = '' AND @Name IS NULL
		BEGIN
			SELECT 0 AS Success, 'Enter a valid name' AS Message;
		END
		ELSE IF EXISTS (
			SELECT 1 
				FROM [dbo].[LeadType]
					WHERE [Name] = @Name AND [LeadTypeId] <> @LeadTypeId
		)
		BEGIN
			SELECT 0 AS Success, 'Update failed, use a unique name' AS Message;
		END
		ELSE 
		BEGIN
			BEGIN TRANSACTION
				UPDATE [dbo].[LeadType]
					SET [Name] = @Name,
						[IsActive] = @IsActive,
						[ModifiedBy] = @ModifiedBy,
						[ModifiedOn] = GETDATE()
							WHERE [LeadTypeId] = @LeadTypeId 
								AND [IsDeleted] = 0;
			COMMIT TRANSACTION
			SELECT 1 AS Success, 'Update successfully' AS Message;
		END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetLeadType]
AS
BEGIN
	SELECT [LeadTypeId], 
			[Name],
			[IsActive] AS [Status]
		FROM [dbo].[LeadType]
		WHERE [IsDeleted] = 0;
	SELECT 1 AS Success, 'Data retrieval successful' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_DeleteLeadType]
@LeadTypeId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
			IF EXISTS (SELECT 1 FROM [dbo].[LeadType] WHERE [LeadTypeId] = @LeadTypeId AND [IsDeleted] = 0)
			BEGIN
				BEGIN TRANSACTION
					UPDATE [dbo].[LeadType]
					SET [IsDeleted] = 1,
						[IsActive] = 0,
						[ModifiedBy] = @ModifiedBy,
						[ModifiedOn] = GETDATE()
							WHERE [LeadTypeId] = @LeadTypeId;
				COMMIT TRANSACTION;
				SELECT 1 AS Success, 'Deleted record successfully' AS Message;
			END
			ELSE
			BEGIN
				SELECT 0 AS Success, 'Record not found' AS Message;
			END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_CreateLeadStatus]
@Name NVARCHAR(100),
@IsActive BIT,
@CreatedBy UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
		IF LTRIM(RTRIM(@Name)) = '' AND @Name IS NULL
		BEGIN
			SELECT 0 AS Success, 'Please enter a valid name' AS Message;
		END
		ELSE IF @IsActive IS NULL OR LTRIM(RTRIM(@IsActive)) = ''
		BEGIN
			SELECT 0 AS Success, 'Invalid Status provided' AS Message;
		END
		ELSE IF EXISTS (SELECT 1 FROM [dbo].[LeadStatus] WHERE [Name] = @Name AND [IsDeleted] = 0)
		BEGIN
			SELECT 0 AS Success, 'Same Status Type exists' AS Message;
		END
		ELSE IF EXISTS (SELECT 1 FROM [dbo].[LeadStatus] WHERE [Name] = LTRIM(RTRIM(@Name)) AND [IsDeleted] = 1 AND [IsActive] = 0)
		BEGIN
			UPDATE [dbo].[LeadStatus]
				SET [IsDeleted] = 0,
					[IsActive] = 1
						WHERE [Name] = @Name;
					
			SELECT 1 AS Success, 'Lead Status Existed, Re-activated!' AS Message;
		END
		ELSE
		BEGIN
			BEGIN TRANSACTION
			INSERT INTO [dbo].[LeadStatus] 
				([Name], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
			VALUES
				(@Name, @IsActive, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());

			COMMIT TRANSACTION;
			SELECT 1 AS Success, 'Creation successful' AS Message;
		END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateLeadStatus]
@LeadStatusId UNIQUEIDENTIFIER,
@Name NVARCHAR(100),
@IsActive BIT,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
		IF LTRIM(RTRIM(@Name)) = '' AND @Name IS NULL
		BEGIN
			SELECT 0 AS Success, 'Enter a valid name' AS Message;
		END
		ELSE IF EXISTS (
			SELECT 1 
				FROM [dbo].[LeadStatus]
					WHERE [Name] = @Name AND [LeadStatusId] <> @LeadStatusId
		)
		BEGIN
			SELECT 0 AS Success, 'Update failed, use a unique name' AS Message;
		END
		ELSE 
		BEGIN
			BEGIN TRANSACTION
				UPDATE [dbo].[LeadStatus]
					SET [Name] = @Name,
						[IsActive] = @IsActive,
						[ModifiedBy] = @ModifiedBy,
						[ModifiedOn] = GETDATE()
							WHERE [LeadStatusId] = @LeadStatusId 
								AND [IsDeleted] = 0;
			COMMIT TRANSACTION
			SELECT 1 AS Success, 'Update successfully' AS Message;
		END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetLeadStatus]
AS
BEGIN
	SELECT [LeadStatusId], 
			[Name],
			[IsActive] AS [Status]
		FROM [dbo].[LeadStatus]
		WHERE [IsDeleted] = 0;
	SELECT 1 AS Success, 'Data retrieval successful' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_DeleteLeadStatus]
@LeadStatusId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
			IF EXISTS (SELECT 1 FROM [dbo].[LeadStatus] WHERE [LeadStatusId] = @LeadStatusId AND [IsDeleted] = 0)
			BEGIN
				BEGIN TRANSACTION
					UPDATE [dbo].[LeadStatus]
					SET [IsDeleted] = 1,
						[IsActive] = 0,
						[ModifiedBy] = @ModifiedBy,
						[ModifiedOn] = GETDATE()
							WHERE [LeadStatusId] = @LeadStatusId;
				COMMIT TRANSACTION;
				SELECT 1 AS Success, 'Deleted record successfully' AS Message;
			END
			ELSE
			BEGIN
				SELECT 0 AS Success, 'Record not found' AS Message;
			END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			SELECT 0 AS Success,
				ERROR_MESSAGE() AS Message,
				ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity,
				ERROR_STATE() AS ErrorState;
	END CATCH
END;
GO

CREATE OR ALTER TRIGGER [dbo].[Trg_LeadSource]
ON [dbo].[LeadSource]
FOR INSERT, UPDATE
AS 
BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[LeadSource]'
DECLARE @TableId INT = '5'
DECLARE @BatchID VARCHAR(50) = NEWID()

--INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.LeadSourceID = DELETED.LeadSourceID))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadSourceID], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadSourceID], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadSourceID], 'IsDeleted', NULL, INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 
	END

--UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.LeadSourceID = DELETED.LeadSourceID)
	BEGIN 
	IF UPDATE ([Name])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadSourceID], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadSourceID] = DELETED.[LeadSourceId]; 
		END

	IF UPDATE ([IsActive])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadSourceID], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadSourceID] = DELETED.[LeadSourceId]; 
		END

	IF UPDATE ([IsDeleted])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadSourceID], 'IsDeleted', DELETED.[IsDeleted], INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadSourceID] = DELETED.[LeadSourceId]; 
		END

	END
END;
GO

ALTER TABLE [dbo].[LeadSource] ENABLE TRIGGER [Trg_LeadSource];
GO

CREATE OR ALTER TRIGGER [dbo].[Trg_LeadType]
ON [dbo].[LeadType]
FOR INSERT, UPDATE
AS 
BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[LeadType]'
DECLARE @TableId INT = '6'
DECLARE @BatchID VARCHAR(50) = NEWID()

--INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.LeadTypeID = DELETED.LeadTypeID))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadTypeID], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadTypeID], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadTypeID], 'IsDeleted', NULL, INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 
	END

--UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.LeadTypeID = DELETED.LeadTypeID)
	BEGIN 
	IF UPDATE ([Name])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadTypeID], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadTypeID] = DELETED.[LeadTypeID]; 
		END

	IF UPDATE ([IsActive])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadTypeID], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadTypeID] = DELETED.[LeadTypeID]; 
		END

	IF UPDATE ([IsDeleted])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadTypeID], 'IsDeleted', DELETED.[IsDeleted], INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadTypeID] = DELETED.[LeadTypeID]; 
		END

	END
END;
GO

ALTER TABLE [dbo].[LeadType] ENABLE TRIGGER [Trg_LeadType];
GO

CREATE OR ALTER TRIGGER [dbo].[Trg_LeadStatus]
ON [dbo].[LeadStatus]
FOR INSERT, UPDATE
AS 
BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[LeadStatus]'
DECLARE @TableId INT = '7'
DECLARE @BatchID VARCHAR(50) = NEWID()

--INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.LeadStatusID = DELETED.LeadStatusID))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadStatusID], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadStatusID], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadStatusID], 'IsDeleted', NULL, INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED; 
	END

--UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.LeadStatusID = DELETED.LeadStatusID)
	BEGIN 
	IF UPDATE ([Name])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadStatusID], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadStatusID] = DELETED.[LeadStatusID]; 
		END

	IF UPDATE ([IsActive])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadStatusID], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadStatusID] = DELETED.[LeadStatusID]; 
		END

	IF UPDATE ([IsDeleted])
		BEGIN
			INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchId], [Operation])
			SELECT @TableName, @TableId, DELETED.[LeadStatusID], 'IsDeleted', DELETED.[IsDeleted], INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadStatusID] = DELETED.[LeadStatusID]; 
		END

	END


END;
GO

ALTER TABLE [dbo].[LeadStatus] ENABLE TRIGGER [Trg_LeadStatus];
GO


CREATE NONCLUSTERED INDEX IX_Users_UserType_Status_Name
ON [dbo].[Users] (UserTypeId, IsActive, Name);

CREATE TABLE [dbo].[Leads]
(
    [LeadId] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Contact] INT,
    [City] NVARCHAR(100),
    [State] NVARCHAR(100),
    [Pincode] INT,
    [Address] NVARCHAR(MAX),

    [LeadType] UNIQUEIDENTIFIER,
    [LeadSource] UNIQUEIDENTIFIER,
    [LeadStatus] UNIQUEIDENTIFIER,
    [AssignedTo] UNIQUEIDENTIFIER,

    [IsActive] BIT,
    [CreatedBy] UNIQUEIDENTIFIER,
    [CreatedOn] DATETIME,
    [ModifiedBy] UNIQUEIDENTIFIER NULL,
    [ModifiedOn] DATETIME,

    CONSTRAINT [FK_Leads_LeadType] FOREIGN KEY ([LeadType]) REFERENCES [dbo].[LeadType]([LeadTypeId]),

    CONSTRAINT [FK_Leads_LeadSource] FOREIGN KEY ([LeadSource]) REFERENCES [dbo].[LeadSource]([LeadSourceId]),

    CONSTRAINT [FK_Leads_LeadStatus] FOREIGN KEY ([LeadStatus]) REFERENCES [dbo].[LeadStatus]([LeadStatusId]),

    CONSTRAINT [FK_Leads_CreatedBy] FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([UserId]),

    CONSTRAINT [FK_Leads_ModifiedBy] FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[Users]([UserId])
);


CREATE TABLE [dbo].[LeadProductsMapping]
(
	[MappingId] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
	[LeadId] UNIQUEIDENTIFIER,
	[ProductId] INT,
	[Quantity] INT,
	[IsActive] BIT,
	[CreatedBy] UNIQUEIDENTIFIER,
	[CreatedOn] DATETIME,
	[ModifiedBy] UNIQUEIDENTIFIER NULL,
	[ModifiedOn] DATETIME

	CONSTRAINT [FK_LeadProductsMapping_Leads] FOREIGN KEY ([LeadId]) REFERENCES [dbo].[Leads]([LeadId])
);