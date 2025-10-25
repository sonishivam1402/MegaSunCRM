/****** Object:  Table [dbo].[AuditLogs]    Script Date: 24-10-2025 10:03:52 ******/
USE [megasuncrmuat];
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditLogs](
	[LogId] [uniqueidentifier] NOT NULL,
	[TableId] [int] NULL,
	[TableName] [nvarchar](100) NOT NULL,
	[TableKey] [nvarchar](100) NOT NULL,
	[FieldName] [nvarchar](100) NOT NULL,
	[PreviousValue] [nvarchar](max) NULL,
	[UpdatedValue] [nvarchar](max) NULL,
	[ModifiedBy] [uniqueidentifier] NULL,
	[ModifiedOn] [datetime] NULL,
	[BatchId] [nvarchar](50) NULL,
	[Operation] [varchar](1) NULL,
	[TableKey1] [nvarchar](100) NULL,
	[TableKey2] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DashboardsPermissions]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DashboardsPermissions](
	[DashboardsPermissionId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IconPath] [nvarchar](max) NULL,
	[IconBGColor] [nvarchar](20) NULL,
	[IconColor] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[DashboardsPermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FollowUps]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FollowUps](
	[FollowUpId] [uniqueidentifier] NOT NULL,
	[Lead] [uniqueidentifier] NOT NULL,
	[LastFollowUpDate] [date] NOT NULL,
	[NextFollowUpDate] [date] NOT NULL,
	[Comments] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[IsDeleted] [bit] NULL,
	[FollowupStatus] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[FollowUpId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportLogs]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportLogs](
	[ImportLogId] [uniqueidentifier] NOT NULL,
	[SourceName] [nvarchar](100) NOT NULL,
	[RequestParams] [nvarchar](max) NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[CRONStartTime] [datetime] NOT NULL,
	[CRONEndTime] [datetime] NULL,
	[CRONCallDuration]  AS (case when [CRONEndTime] IS NOT NULL then CONVERT([time],[CRONEndTime]-[CRONStartTime])  end) PERSISTED,
	[ResponseStatus] [int] NULL,
	[ResponseMessage] [nvarchar](max) NULL,
	[RawResponseSample] [nvarchar](max) NULL,
	[TotalRecordsFetched] [int] NULL,
	[TotalRecordsInserted] [int] NULL,
	[ErrorCount] [int] NULL,
	[ErrorDetails] [nvarchar](max) NULL,
	[RunStatus] [nvarchar](50) NULL,
	[CorrelationId] [uniqueidentifier] NULL,
	[InsertedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_ImportLogs] PRIMARY KEY CLUSTERED 
(
	[ImportLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IndiaMartLogs]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IndiaMartLogs](
	[LogId] [uniqueidentifier] NOT NULL,
	[LogTimestamp] [datetime2](3) NOT NULL,
	[LogType] [nvarchar](50) NOT NULL,
	[Status] [nvarchar](50) NOT NULL,
	[Message] [nvarchar](1000) NULL,
	[Details] [nvarchar](max) NULL,
	[ErrorMessage] [nvarchar](1000) NULL,
	[StackTrace] [nvarchar](max) NULL,
	[ErrorNumber] [int] NULL,
	[ErrorState] [int] NULL,
	[ErrorClass] [int] NULL,
	[ProcName] [nvarchar](255) NULL,
	[LineNumber] [int] NULL,
	[InsertedCount] [int] NULL,
	[DuplicateCount] [int] NULL,
	[TotalProcessed] [int] NULL,
	[ResultStatus] [nvarchar](100) NULL,
	[ApiUrl] [nvarchar](1000) NULL,
	[ApiResponseCode] [int] NULL,
	[ApiResponseMessage] [nvarchar](500) NULL,
	[TotalRecords] [int] NULL,
	[SourceName] [nvarchar](255) NULL,
	[TriggeredBy] [nvarchar](100) NULL,
	[CreatedAt] [datetime2](3) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadProductsMapping]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadProductsMapping](
	[MappingId] [uniqueidentifier] NOT NULL,
	[LeadId] [uniqueidentifier] NULL,
	[ProductId] [int] NULL,
	[Quantity] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [uniqueidentifier] NULL,
	[ModifiedOn] [datetime] NULL,
	[ProductName] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Leads]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Leads](
	[LeadId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Contact] [nvarchar](100) NOT NULL,
	[City] [nvarchar](100) NULL,
	[State] [nvarchar](100) NULL,
	[LeadType] [uniqueidentifier] NULL,
	[LeadSource] [uniqueidentifier] NULL,
	[LeadStatus] [uniqueidentifier] NULL,
	[AssignedTo] [uniqueidentifier] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [uniqueidentifier] NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
	[GSTNumber] [varchar](100) NULL,
	[Email] [nvarchar](100) NULL,
	[Country] [nvarchar](100) NULL,
	[Address] [nvarchar](100) NULL,
	[Pincode] [nvarchar](100) NULL,
 CONSTRAINT [PK_Leads] PRIMARY KEY CLUSTERED 
(
	[LeadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadSource]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadSource](
	[LeadSourceId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_LeadSource] PRIMARY KEY CLUSTERED 
(
	[LeadSourceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadStatus]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadStatus](
	[LeadStatusId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_LeadStatus] PRIMARY KEY CLUSTERED 
(
	[LeadStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadType]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadType](
	[LeadTypeId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_LeadType] PRIMARY KEY CLUSTERED 
(
	[LeadTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderProductsMapping]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderProductsMapping](
	[MappingId] [uniqueidentifier] NOT NULL,
	[OrderId] [uniqueidentifier] NOT NULL,
	[ProductId] [int] NULL,
	[Quantity] [int] NOT NULL,
	[QuotedPrice] [decimal](18, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ProductName] [nvarchar](200) NOT NULL,
	[HSNCode] [nvarchar](50) NULL,
	[Rate] [decimal](18, 2) NOT NULL,
	[BasicAmount] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NULL,
	[Tax] [decimal](18, 2) NULL,
	[TotalAmount] [decimal](18, 2) NOT NULL,
	[ItemDescription] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [uniqueidentifier] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SystemGeneratedId]  AS (concat('MKBHD-',[Id])) PERSISTED NOT NULL,
	[OrderBy] [uniqueidentifier] NOT NULL,
	[LeadId] [uniqueidentifier] NOT NULL,
	[ShippingCompanyName] [nvarchar](200) NULL,
	[ShippingEmailAddress] [nvarchar](200) NULL,
	[ShippingAddress] [nvarchar](max) NULL,
	[ShippingCity] [nvarchar](100) NULL,
	[ShippingState] [nvarchar](100) NULL,
	[ShippingPincode] [nvarchar](20) NULL,
	[ShippingCountry] [nvarchar](100) NULL,
	[BasicAmount] [decimal](18, 2) NOT NULL,
	[FinalAmount] [decimal](18, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[OrderDate] [date] NOT NULL,
	[IsDomestic] [bit] NOT NULL,
	[Currency] [nvarchar](3) NOT NULL,
	[ExpectedDispatchDays] [int] NULL,
	[PaymentTerms] [nvarchar](100) NULL,
	[Notes] [nvarchar](max) NULL,
	[Terms] [nvarchar](100) NULL,
	[TaxFormat] [nvarchar](100) NULL,
	[Discount] [decimal](18, 2) NULL,
	[Total] [decimal](18, 2) NULL,
	[SGST] [decimal](18, 2) NULL,
	[CGST] [decimal](18, 2) NULL,
	[IGST] [decimal](18, 2) NULL,
	[Tax] [decimal](18, 2) NULL,
	[RoundOff] [decimal](18, 2) NULL,
	[GrandTotal] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Orders_SystemGeneratedId] UNIQUE NONCLUSTERED 
(
	[SystemGeneratedId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[PermissionId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Type] [nvarchar](100) NULL,
	[IconPath] [nvarchar](max) NULL,
	[NavigationPath] [nvarchar](100) NULL,
	[OrderBy] [int] NULL,
	[isDefault] [bit] NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuotationProductsMapping]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuotationProductsMapping](
	[MappingId] [uniqueidentifier] NOT NULL,
	[QuotationId] [uniqueidentifier] NOT NULL,
	[ProductId] [int] NULL,
	[Quantity] [int] NOT NULL,
	[QuotedPrice] [decimal](18, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ProductName] [nvarchar](200) NOT NULL,
	[HSNCode] [nvarchar](50) NULL,
	[Rate] [decimal](18, 2) NOT NULL,
	[BasicAmount] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NULL,
	[Tax] [decimal](18, 2) NULL,
	[TotalAmount] [decimal](18, 2) NOT NULL,
	[ItemDescription] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Quotations]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Quotations](
	[QuotationId] [uniqueidentifier] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SystemGeneratedId]  AS (concat('MKBHD-',[Id])) PERSISTED NOT NULL,
	[QuotationBy] [uniqueidentifier] NOT NULL,
	[LeadId] [uniqueidentifier] NOT NULL,
	[ShippingCompanyName] [nvarchar](200) NULL,
	[ShippingEmailAddress] [nvarchar](200) NULL,
	[ShippingAddress] [nvarchar](max) NULL,
	[ShippingCity] [nvarchar](100) NULL,
	[ShippingState] [nvarchar](100) NULL,
	[ShippingPincode] [nvarchar](20) NULL,
	[ShippingCountry] [nvarchar](100) NULL,
	[BasicAmount] [decimal](18, 2) NOT NULL,
	[FinalAmount] [decimal](18, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[QuotationDate] [date] NOT NULL,
	[IsDomestic] [bit] NOT NULL,
	[Currency] [nvarchar](3) NOT NULL,
	[ExpectedDispatchDays] [int] NULL,
	[PaymentTerms] [nvarchar](100) NULL,
	[Notes] [nvarchar](max) NULL,
	[Terms] [nvarchar](100) NULL,
	[TaxFormat] [nvarchar](100) NULL,
	[Discount] [decimal](18, 2) NULL,
	[Total] [decimal](18, 2) NULL,
	[SGST] [decimal](18, 2) NULL,
	[CGST] [decimal](18, 2) NULL,
	[IGST] [decimal](18, 2) NULL,
	[Tax] [decimal](18, 2) NULL,
	[RoundOff] [decimal](18, 2) NULL,
	[GrandTotal] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[QuotationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Quotations_SystemGeneratedId] UNIQUE NONCLUSTERED 
(
	[SystemGeneratedId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshTokens](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Token] [nvarchar](500) NOT NULL,
	[ExpiryDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Targets]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Targets](
	[TargetID] [uniqueidentifier] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[TotalTarget] [int] NOT NULL,
	[Month] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserActivityLog]    Script Date: 24-10-2025 10:03:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserActivityLog](
	[LogId] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NULL,
	[ActivityType] [nvarchar](50) NOT NULL,
	[AttemptedUsername] [nvarchar](max) NOT NULL,
	[LogTimeStamp] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[UserTypeId] [uniqueidentifier] NOT NULL,
	[HashPassword] [nvarchar](max) NOT NULL,
	[Contact] [nvarchar](20) NOT NULL,
	[ProfileImagePath] [nvarchar](max) NULL,
	[Designation] [nvarchar](100) NULL,
	[GSTId] [nvarchar](100) NULL,
	[Address] [nvarchar](max) NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Users_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserType]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserType](
	[UserTypeId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsAdmin] [bit] NULL,
	[IsRegularUser] [bit] NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_UsersType_Name] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypeDashboardsPermissionsControl]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTypeDashboardsPermissionsControl](
	[MappingId] [uniqueidentifier] NOT NULL,
	[UserTypeId] [uniqueidentifier] NULL,
	[DashboardsPermissionId] [uniqueidentifier] NULL,
	[HasAccess] [bit] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypePermissionsControl]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTypePermissionsControl](
	[MappingId] [uniqueidentifier] NOT NULL,
	[UserTypeId] [uniqueidentifier] NULL,
	[PermissionId] [uniqueidentifier] NULL,
	[CreateAccess] [bit] NOT NULL,
	[ReadAccess] [bit] NOT NULL,
	[UpdateAccess] [bit] NOT NULL,
	[DeleteAccess] [bit] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_FollowUps_Lead_NextDate]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_FollowUps_Lead_NextDate] ON [dbo].[FollowUps]
(
	[Lead] ASC,
	[NextFollowUpDate] ASC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_IndiaMartLogs_LogType]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_IndiaMartLogs_LogType] ON [dbo].[IndiaMartLogs]
(
	[LogType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_IndiaMartLogs_Status]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_IndiaMartLogs_Status] ON [dbo].[IndiaMartLogs]
(
	[Status] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_IndiaMartLogs_Timestamp]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_IndiaMartLogs_Timestamp] ON [dbo].[IndiaMartLogs]
(
	[LogTimestamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_QuotationProductsMapping_ProductId]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_QuotationProductsMapping_ProductId] ON [dbo].[QuotationProductsMapping]
(
	[ProductId] ASC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_QuotationProductsMapping_QuotationId]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_QuotationProductsMapping_QuotationId] ON [dbo].[QuotationProductsMapping]
(
	[QuotationId] ASC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Quotations_IsDomestic]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_Quotations_IsDomestic] ON [dbo].[Quotations]
(
	[IsDomestic] ASC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Quotations_LeadId]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_Quotations_LeadId] ON [dbo].[Quotations]
(
	[LeadId] ASC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Quotations_QuotationBy_CreatedOn]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_Quotations_QuotationBy_CreatedOn] ON [dbo].[Quotations]
(
	[QuotationBy] ASC,
	[CreatedOn] DESC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Quotations_QuotationDate]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_Quotations_QuotationDate] ON [dbo].[Quotations]
(
	[QuotationDate] DESC
)
WHERE ([IsActive]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Users_UserType_Status_Name]    Script Date: 24-10-2025 10:03:53 ******/
CREATE NONCLUSTERED INDEX [IX_Users_UserType_Status_Name] ON [dbo].[Users]
(
	[UserTypeId] ASC,
	[IsActive] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AuditLogs] ADD  DEFAULT (newid()) FOR [LogId]
GO
ALTER TABLE [dbo].[DashboardsPermissions] ADD  DEFAULT (newid()) FOR [DashboardsPermissionId]
GO
ALTER TABLE [dbo].[DashboardsPermissions] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[FollowUps] ADD  DEFAULT (newid()) FOR [FollowUpId]
GO
ALTER TABLE [dbo].[FollowUps] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[FollowUps] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[FollowUps] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[ImportLogs] ADD  DEFAULT (newid()) FOR [ImportLogId]
GO
ALTER TABLE [dbo].[ImportLogs] ADD  DEFAULT ((0)) FOR [TotalRecordsFetched]
GO
ALTER TABLE [dbo].[ImportLogs] ADD  DEFAULT ((0)) FOR [TotalRecordsInserted]
GO
ALTER TABLE [dbo].[ImportLogs] ADD  DEFAULT ((0)) FOR [ErrorCount]
GO
ALTER TABLE [dbo].[ImportLogs] ADD  DEFAULT ('Pending') FOR [RunStatus]
GO
ALTER TABLE [dbo].[ImportLogs] ADD  DEFAULT (getutcdate()) FOR [InsertedAt]
GO
ALTER TABLE [dbo].[IndiaMartLogs] ADD  DEFAULT (newid()) FOR [LogId]
GO
ALTER TABLE [dbo].[IndiaMartLogs] ADD  DEFAULT (sysdatetime()) FOR [LogTimestamp]
GO
ALTER TABLE [dbo].[IndiaMartLogs] ADD  DEFAULT (sysdatetime()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[LeadProductsMapping] ADD  DEFAULT (newid()) FOR [MappingId]
GO
ALTER TABLE [dbo].[Leads] ADD  DEFAULT (newid()) FOR [LeadId]
GO
ALTER TABLE [dbo].[LeadSource] ADD  DEFAULT (newid()) FOR [LeadSourceId]
GO
ALTER TABLE [dbo].[LeadStatus] ADD  DEFAULT (newid()) FOR [LeadStatusId]
GO
ALTER TABLE [dbo].[LeadType] ADD  DEFAULT (newid()) FOR [LeadTypeId]
GO
ALTER TABLE [dbo].[OrderProductsMapping] ADD  DEFAULT (newid()) FOR [MappingId]
GO
ALTER TABLE [dbo].[OrderProductsMapping] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[OrderProductsMapping] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[OrderProductsMapping] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[OrderProductsMapping] ADD  DEFAULT ((0)) FOR [Discount]
GO
ALTER TABLE [dbo].[OrderProductsMapping] ADD  DEFAULT ((0)) FOR [Tax]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (newid()) FOR [OrderId]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (CONVERT([date],getdate())) FOR [OrderDate]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((1)) FOR [IsDomestic]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ('INR') FOR [Currency]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Discount]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [SGST]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [CGST]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [IGST]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Tax]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [RoundOff]
GO
ALTER TABLE [dbo].[Permissions] ADD  DEFAULT (newid()) FOR [PermissionId]
GO
ALTER TABLE [dbo].[Permissions] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ADD  DEFAULT (newid()) FOR [MappingId]
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ADD  DEFAULT ((0)) FOR [Discount]
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ADD  DEFAULT ((0)) FOR [Tax]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT (newid()) FOR [QuotationId]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT (CONVERT([date],getdate())) FOR [QuotationDate]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((1)) FOR [IsDomestic]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ('INR') FOR [Currency]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((0)) FOR [Discount]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((0)) FOR [SGST]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((0)) FOR [CGST]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((0)) FOR [IGST]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((0)) FOR [Tax]
GO
ALTER TABLE [dbo].[Quotations] ADD  DEFAULT ((0)) FOR [RoundOff]
GO
ALTER TABLE [dbo].[Targets] ADD  DEFAULT (newid()) FOR [TargetID]
GO
ALTER TABLE [dbo].[UserActivityLog] ADD  DEFAULT (newid()) FOR [LogId]
GO
ALTER TABLE [dbo].[UserActivityLog] ADD  DEFAULT (getdate()) FOR [LogTimeStamp]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (newid()) FOR [UserId]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[UserType] ADD  DEFAULT (newid()) FOR [UserTypeId]
GO
ALTER TABLE [dbo].[UserType] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] ADD  DEFAULT (newid()) FOR [MappingId]
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[UserTypePermissionsControl] ADD  DEFAULT (newid()) FOR [MappingId]
GO
ALTER TABLE [dbo].[UserTypePermissionsControl] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[DashboardsPermissions]  WITH CHECK ADD  CONSTRAINT [FK_DashboardsPermissions_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[DashboardsPermissions] CHECK CONSTRAINT [FK_DashboardsPermissions_CreatedBy]
GO
ALTER TABLE [dbo].[DashboardsPermissions]  WITH CHECK ADD  CONSTRAINT [FK_DashboardsPermissions_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[DashboardsPermissions] CHECK CONSTRAINT [FK_DashboardsPermissions_ModifiedBy]
GO
ALTER TABLE [dbo].[FollowUps]  WITH CHECK ADD  CONSTRAINT [FK_FollowUps_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUps] CHECK CONSTRAINT [FK_FollowUps_CreatedBy]
GO
ALTER TABLE [dbo].[FollowUps]  WITH CHECK ADD  CONSTRAINT [FK_FollowUps_FollowupStatus] FOREIGN KEY([FollowupStatus])
REFERENCES [dbo].[LeadStatus] ([LeadStatusId])
GO
ALTER TABLE [dbo].[FollowUps] CHECK CONSTRAINT [FK_FollowUps_FollowupStatus]
GO
ALTER TABLE [dbo].[FollowUps]  WITH CHECK ADD  CONSTRAINT [FK_FollowUps_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUps] CHECK CONSTRAINT [FK_FollowUps_ModifiedBy]
GO
ALTER TABLE [dbo].[LeadProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_LeadProductsMapping_Leads] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Leads] ([LeadId])
GO
ALTER TABLE [dbo].[LeadProductsMapping] CHECK CONSTRAINT [FK_LeadProductsMapping_Leads]
GO
ALTER TABLE [dbo].[Leads]  WITH CHECK ADD  CONSTRAINT [FK_Leads_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Leads] CHECK CONSTRAINT [FK_Leads_CreatedBy]
GO
ALTER TABLE [dbo].[Leads]  WITH CHECK ADD  CONSTRAINT [FK_Leads_LeadSource] FOREIGN KEY([LeadSource])
REFERENCES [dbo].[LeadSource] ([LeadSourceId])
GO
ALTER TABLE [dbo].[Leads] CHECK CONSTRAINT [FK_Leads_LeadSource]
GO
ALTER TABLE [dbo].[Leads]  WITH CHECK ADD  CONSTRAINT [FK_Leads_LeadStatus] FOREIGN KEY([LeadStatus])
REFERENCES [dbo].[LeadStatus] ([LeadStatusId])
GO
ALTER TABLE [dbo].[Leads] CHECK CONSTRAINT [FK_Leads_LeadStatus]
GO
ALTER TABLE [dbo].[Leads]  WITH CHECK ADD  CONSTRAINT [FK_Leads_LeadType] FOREIGN KEY([LeadType])
REFERENCES [dbo].[LeadType] ([LeadTypeId])
GO
ALTER TABLE [dbo].[Leads] CHECK CONSTRAINT [FK_Leads_LeadType]
GO
ALTER TABLE [dbo].[Leads]  WITH CHECK ADD  CONSTRAINT [FK_Leads_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Leads] CHECK CONSTRAINT [FK_Leads_ModifiedBy]
GO
ALTER TABLE [dbo].[LeadSource]  WITH CHECK ADD  CONSTRAINT [FK_LeadSource_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[LeadSource] CHECK CONSTRAINT [FK_LeadSource_CreatedBy]
GO
ALTER TABLE [dbo].[LeadSource]  WITH CHECK ADD  CONSTRAINT [FK_LeadSource_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[LeadSource] CHECK CONSTRAINT [FK_LeadSource_ModifiedBy]
GO
ALTER TABLE [dbo].[LeadStatus]  WITH CHECK ADD  CONSTRAINT [FK_LeadStatus_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[LeadStatus] CHECK CONSTRAINT [FK_LeadStatus_CreatedBy]
GO
ALTER TABLE [dbo].[LeadStatus]  WITH CHECK ADD  CONSTRAINT [FK_LeadStatus_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[LeadStatus] CHECK CONSTRAINT [FK_LeadStatus_ModifiedBy]
GO
ALTER TABLE [dbo].[LeadType]  WITH CHECK ADD  CONSTRAINT [FK_LeadType_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[LeadType] CHECK CONSTRAINT [FK_LeadType_CreatedBy]
GO
ALTER TABLE [dbo].[LeadType]  WITH CHECK ADD  CONSTRAINT [FK_LeadType_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[LeadType] CHECK CONSTRAINT [FK_LeadType_ModifiedBy]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_OrderProductsMapping_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [FK_OrderProductsMapping_CreatedBy]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_OrderProductsMapping_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [FK_OrderProductsMapping_ModifiedBy]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_OrderProductsMapping_OrderId] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([OrderId])
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [FK_OrderProductsMapping_OrderId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_CreatedBy]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_LeadId] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Leads] ([LeadId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_LeadId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_ModifiedBy]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderBy] FOREIGN KEY([OrderBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_OrderBy]
GO
ALTER TABLE [dbo].[Permissions]  WITH CHECK ADD  CONSTRAINT [FK_Permissions_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Permissions] CHECK CONSTRAINT [FK_Permissions_CreatedBy]
GO
ALTER TABLE [dbo].[Permissions]  WITH CHECK ADD  CONSTRAINT [FK_Permissions_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Permissions] CHECK CONSTRAINT [FK_Permissions_ModifiedBy]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_QuotationProductsMapping_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [FK_QuotationProductsMapping_CreatedBy]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_QuotationProductsMapping_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [FK_QuotationProductsMapping_ModifiedBy]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [FK_QuotationProductsMapping_QuotationId] FOREIGN KEY([QuotationId])
REFERENCES [dbo].[Quotations] ([QuotationId])
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [FK_QuotationProductsMapping_QuotationId]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [FK_Quotations_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [FK_Quotations_CreatedBy]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [FK_Quotations_LeadId] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Leads] ([LeadId])
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [FK_Quotations_LeadId]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [FK_Quotations_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [FK_Quotations_ModifiedBy]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [FK_Quotations_QuotationBy] FOREIGN KEY([QuotationBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [FK_Quotations_QuotationBy]
GO
ALTER TABLE [dbo].[RefreshTokens]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserActivityLog]  WITH CHECK ADD  CONSTRAINT [FK_UserLoginActivity_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserActivityLog] CHECK CONSTRAINT [FK_UserLoginActivity_UserId]
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] CHECK CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_CreatedBy]
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_DashboardsPermissionId] FOREIGN KEY([DashboardsPermissionId])
REFERENCES [dbo].[DashboardsPermissions] ([DashboardsPermissionId])
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] CHECK CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_DashboardsPermissionId]
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] CHECK CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_ModifiedBy]
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_UserTypeId] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserType] ([UserTypeId])
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] CHECK CONSTRAINT [FK_UserTypeDashboardsPermissionsControl_UserTypeId]
GO
ALTER TABLE [dbo].[UserTypePermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypePermissionsControl_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserTypePermissionsControl] CHECK CONSTRAINT [FK_UserTypePermissionsControl_CreatedBy]
GO
ALTER TABLE [dbo].[UserTypePermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypePermissionsControl_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserTypePermissionsControl] CHECK CONSTRAINT [FK_UserTypePermissionsControl_ModifiedBy]
GO
ALTER TABLE [dbo].[UserTypePermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypePermissionsControl_PermissionId] FOREIGN KEY([PermissionId])
REFERENCES [dbo].[Permissions] ([PermissionId])
GO
ALTER TABLE [dbo].[UserTypePermissionsControl] CHECK CONSTRAINT [FK_UserTypePermissionsControl_PermissionId]
GO
ALTER TABLE [dbo].[UserTypePermissionsControl]  WITH CHECK ADD  CONSTRAINT [FK_UserTypePermissionsControl_UserTypeId] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserType] ([UserTypeId])
GO
ALTER TABLE [dbo].[UserTypePermissionsControl] CHECK CONSTRAINT [FK_UserTypePermissionsControl_UserTypeId]
GO
ALTER TABLE [dbo].[FollowUps]  WITH CHECK ADD  CONSTRAINT [CHK_FollowUps_NextDateAfterLast] CHECK  (([NextFollowUpDate]>=[LastFollowUpDate]))
GO
ALTER TABLE [dbo].[FollowUps] CHECK CONSTRAINT [CHK_FollowUps_NextDateAfterLast]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_OrderProductsMapping_BasicAmount_Positive] CHECK  (([BasicAmount]>(0)))
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [CHK_OrderProductsMapping_BasicAmount_Positive]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_OrderProductsMapping_Discount_NonNegative] CHECK  (([Discount]>=(0)))
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [CHK_OrderProductsMapping_Discount_NonNegative]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_OrderProductsMapping_Quantity_Positive] CHECK  (([Quantity]>(0)))
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [CHK_OrderProductsMapping_Quantity_Positive]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_OrderProductsMapping_QuotedPrice_Positive] CHECK  (([QuotedPrice]>(0)))
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [CHK_OrderProductsMapping_QuotedPrice_Positive]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_OrderProductsMapping_Rate_Positive] CHECK  (([Rate]>(0)))
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [CHK_OrderProductsMapping_Rate_Positive]
GO
ALTER TABLE [dbo].[OrderProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_OrderProductsMapping_TotalAmount_Positive] CHECK  (([TotalAmount]>(0)))
GO
ALTER TABLE [dbo].[OrderProductsMapping] CHECK CONSTRAINT [CHK_OrderProductsMapping_TotalAmount_Positive]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CHK_Orders_BasicAmount_Positive] CHECK  (([BasicAmount]>(0)))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CHK_Orders_BasicAmount_Positive]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CHK_Orders_Discount_NonNegative] CHECK  (([Discount]>=(0)))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CHK_Orders_Discount_NonNegative]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CHK_Orders_ExpectedDispatchDays_Positive] CHECK  (([ExpectedDispatchDays]>(0)))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CHK_Orders_ExpectedDispatchDays_Positive]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CHK_Orders_FinalAmount_Positive] CHECK  (([FinalAmount]>(0)))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CHK_Orders_FinalAmount_Positive]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CHK_Orders_GrandTotal_Positive] CHECK  (([GrandTotal]>(0)))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CHK_Orders_GrandTotal_Positive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_QuotationProductsMapping_BasicAmount_Positive] CHECK  (([BasicAmount]>(0)))
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [CHK_QuotationProductsMapping_BasicAmount_Positive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_QuotationProductsMapping_Discount_NonNegative] CHECK  (([Discount]>=(0)))
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [CHK_QuotationProductsMapping_Discount_NonNegative]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_QuotationProductsMapping_Quantity_Positive] CHECK  (([Quantity]>(0)))
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [CHK_QuotationProductsMapping_Quantity_Positive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_QuotationProductsMapping_QuotedPrice_Positive] CHECK  (([QuotedPrice]>(0)))
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [CHK_QuotationProductsMapping_QuotedPrice_Positive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_QuotationProductsMapping_Rate_Positive] CHECK  (([Rate]>(0)))
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [CHK_QuotationProductsMapping_Rate_Positive]
GO
ALTER TABLE [dbo].[QuotationProductsMapping]  WITH CHECK ADD  CONSTRAINT [CHK_QuotationProductsMapping_TotalAmount_Positive] CHECK  (([TotalAmount]>(0)))
GO
ALTER TABLE [dbo].[QuotationProductsMapping] CHECK CONSTRAINT [CHK_QuotationProductsMapping_TotalAmount_Positive]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [CHK_Quotations_BasicAmount_Positive] CHECK  (([BasicAmount]>(0)))
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [CHK_Quotations_BasicAmount_Positive]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [CHK_Quotations_Discount_NonNegative] CHECK  (([Discount]>=(0)))
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [CHK_Quotations_Discount_NonNegative]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [CHK_Quotations_ExpectedDispatchDays_Positive] CHECK  (([ExpectedDispatchDays]>(0)))
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [CHK_Quotations_ExpectedDispatchDays_Positive]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [CHK_Quotations_FinalAmount_Positive] CHECK  (([FinalAmount]>(0)))
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [CHK_Quotations_FinalAmount_Positive]
GO
ALTER TABLE [dbo].[Quotations]  WITH CHECK ADD  CONSTRAINT [CHK_Quotations_GrandTotal_Positive] CHECK  (([GrandTotal]>(0)))
GO
ALTER TABLE [dbo].[Quotations] CHECK CONSTRAINT [CHK_Quotations_GrandTotal_Positive]
GO
/****** Object:  StoredProcedure [dbo].[GetTargetAndSalesByUserID]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[GetTargetAndSalesByUserID]
@UserID UNIQUEIDENTIFIER,
@Year INT
AS
BEGIN

	SELECT 
		(SELECT	SUM([GrandTotal]) FROM [dbo].[Orders] WHERE [OrderBy] = @UserID) AS [Total Sales (Amount)],
		'0' AS [Total Sales (Number)],
		(SELECT COUNT(*) FROM [dbo].[Leads] L INNER JOIN [dbo].[LeadStatus] LS ON L.[LeadStatus] = LS.[LeadStatusId] WHERE LS.[Name] = 'Deal Done' AND [AssignedTo] = @UserID) AS [Deal Done],
		(SELECT COUNT(*) FROM [dbo].[Leads] L INNER JOIN [dbo].[LeadStatus] LS ON L.[LeadStatus] = LS.[LeadStatusId] WHERE LS.[Name] NOT IN ('Deal Done', 'Deal Closed', 'Not Interested') AND [AssignedTo] = @UserID) AS [Open Leads];

	SELECT 
		FORMAT(DATEFROMPARTS(@Year, m.number, 1), 'MMM yyyy') AS MonthLabel,
		CAST(ISNULL(SUM(O.FinalAmount), 0) AS int) AS Achievement
		FROM master..spt_values m
		LEFT JOIN [dbo].[Targets] T 
		ON m.number = T.Month 
		AND T.Year = @Year 
		AND T.UserID = @UserId
		AND T.IsActive = 1
		LEFT JOIN [dbo].[Orders] O
		INNER JOIN [dbo].[Leads] L ON O.LeadId = L.LeadId
		ON MONTH(O.OrderDate) = m.number
		AND YEAR(O.OrderDate) = @Year
		AND L.AssignedTo = @UserId
		AND O.IsActive = 1
		WHERE m.type = 'P' AND m.number BETWEEN 1 AND 12
		GROUP BY m.number, T.TotalTarget
		ORDER BY m.number;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateAPIImportedBulkLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_CreateAPIImportedBulkLeads]
    @LeadSourceName NVARCHAR(255),
    @LeadsData NVARCHAR(MAX), -- JSON array of leads
    @CreatedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @LeadSourceId UNIQUEIDENTIFIER;
    DECLARE @LeadStatusId UNIQUEIDENTIFIER;
    DECLARE @LeadTypeId UNIQUEIDENTIFIER;
    DECLARE @InsertedLeads INT = 0;
    DECLARE @DuplicateLeads INT = 0;
    DECLARE @TotalLeads INT = 0;
    
    -- Print debug info
    PRINT '[SP] Starting sp_CreateAPIImportedBulkLeads';
    PRINT '[SP] LeadSourceName: ' + @LeadSourceName;
    PRINT '[SP] CreatedBy: ' + CAST(@CreatedBy AS NVARCHAR(50));
    
    -- Get LeadSource ID
    SELECT @LeadSourceId = LeadSourceId 
    FROM LeadSource 
    WHERE Name = @LeadSourceName AND IsActive = 1 AND IsDeleted = 0;
    
    PRINT '[SP] LeadSourceId: ' + ISNULL(CAST(@LeadSourceId AS NVARCHAR(50)), 'NULL');
    
    -- Get Fresh Lead Status ID
    SELECT @LeadStatusId = LeadStatusId 
    FROM LeadStatus 
    WHERE Name = 'Fresh lead' AND IsActive = 1 AND IsDeleted = 0;
    
    PRINT '[SP] LeadStatusId: ' + ISNULL(CAST(@LeadStatusId AS NVARCHAR(50)), 'NULL');
    
    -- Get User Lead Type ID
    SELECT @LeadTypeId = LeadTypeId 
    FROM LeadType 
    WHERE Name = 'User' AND IsActive = 1 AND IsDeleted = 0;
    
    PRINT '[SP] LeadTypeId: ' + ISNULL(CAST(@LeadTypeId AS NVARCHAR(50)), 'NULL');
    
    -- Validate required IDs exist
    IF @LeadSourceId IS NULL
    BEGIN
        RAISERROR('Lead Source "%s" not found or inactive', 16, 1, @LeadSourceName);
        RETURN;
    END
    
    IF @LeadStatusId IS NULL
    BEGIN
        RAISERROR('Lead Status "Fresh lead" not found or inactive', 16, 1);
        RETURN;
    END
    
    IF @LeadTypeId IS NULL
    BEGIN
        RAISERROR('Lead Type "User" not found or inactive', 16, 1);
        RETURN;
    END
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Count total leads in JSON
        SELECT @TotalLeads = COUNT(*) 
        FROM OPENJSON(@LeadsData);
        
        PRINT '[SP] Total leads in JSON: ' + CAST(@TotalLeads AS NVARCHAR(10));
        
        -- Create temp table with LARGER field sizes to prevent truncation
        CREATE TABLE #NewLeads (
            TempId INT IDENTITY(1,1),
            LeadId UNIQUEIDENTIFIER,
            Name NVARCHAR(100),
            Contact NVARCHAR(100),
            City NVARCHAR(100),
            State NVARCHAR(100),
            Email NVARCHAR(100),
            Country NVARCHAR(100),
            Address NVARCHAR(500),  -- INCREASED FROM 100 TO 500
            Pincode NVARCHAR(100),
            ProductName NVARCHAR(MAX),
            IsDuplicate BIT DEFAULT 0
        );
        
        PRINT '[SP] Temp table created with Address NVARCHAR(500)';
        
        -- Parse JSON and identify new vs duplicate leads
        INSERT INTO #NewLeads (LeadId, Name, Contact, City, State, Email, Country, Address, Pincode, ProductName, IsDuplicate)
        SELECT 
            NEWID() AS LeadId,
            JSON_VALUE(value, '$.SENDER_NAME') AS Name,
            REPLACE(REPLACE(JSON_VALUE(value, '$.SENDER_MOBILE'), '+91-', ''), ' ', '') AS Contact,
            JSON_VALUE(value, '$.SENDER_CITY') AS City,
            JSON_VALUE(value, '$.SENDER_STATE') AS State,
            NULLIF(LTRIM(RTRIM(JSON_VALUE(value, '$.SENDER_EMAIL'))), '') AS Email,
            JSON_VALUE(value, '$.SENDER_COUNTRY_ISO') AS Country,
            LEFT(JSON_VALUE(value, '$.SENDER_ADDRESS'), 500) AS Address,  -- SAFELY TRUNCATE TO 500
            NULLIF(JSON_VALUE(value, '$.SENDER_PINCODE'), '') AS Pincode,
            JSON_VALUE(value, '$.QUERY_PRODUCT_NAME') AS ProductName,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM Leads L 
                    WHERE L.Contact = REPLACE(REPLACE(JSON_VALUE(value, '$.SENDER_MOBILE'), '+91-', ''), ' ', '')
                    AND L.Contact IS NOT NULL 
                    AND L.Contact != ''
                    AND L.IsDeleted = 0
                ) THEN 1 
                ELSE 0 
            END AS IsDuplicate
        FROM OPENJSON(@LeadsData)
        WHERE REPLACE(REPLACE(JSON_VALUE(value, '$.SENDER_MOBILE'), '+91-', ''), ' ', '') != ''
        AND REPLACE(REPLACE(JSON_VALUE(value, '$.SENDER_MOBILE'), '+91-', ''), ' ', '') IS NOT NULL;
        
        PRINT '[SP] Leads parsed from JSON and inserted into temp table';
        
        -- Count duplicates
        SELECT @DuplicateLeads = COUNT(*) FROM #NewLeads WHERE IsDuplicate = 1;
        
        PRINT '[SP] Duplicate leads found: ' + CAST(@DuplicateLeads AS NVARCHAR(10));
        PRINT '[SP] New leads to insert: ' + CAST((@TotalLeads - @DuplicateLeads) AS NVARCHAR(10));
        
        -- Insert only non-duplicate leads
        -- CRITICAL: Truncate Address to 100 chars for the Leads table
        INSERT INTO Leads (
            LeadId,
            Name,
            Contact,
            City,
            State,
            LeadType,
            LeadSource,
            LeadStatus,
            AssignedTo,
            IsActive,
            CreatedBy,
            CreatedOn,
            ModifiedBy,
            ModifiedOn,
            IsDeleted,
            Email,
            Country,
            Address,
            Pincode
        )
        SELECT 
            LeadId,
            Name,
            Contact,
            City,
            State,
            @LeadTypeId,
            @LeadSourceId,
            @LeadStatusId,
            NULL,
            1,
            @CreatedBy,
            GETDATE(),
            @CreatedBy,
            GETDATE(),
            0,
            Email,
            Country,
            LEFT(Address, 100),  -- TRUNCATE TO 100 FOR LEADS TABLE
            Pincode
        FROM #NewLeads
        WHERE IsDuplicate = 0;
        
        SET @InsertedLeads = @@ROWCOUNT;
        
        PRINT '[SP] Leads inserted: ' + CAST(@InsertedLeads AS NVARCHAR(10));
        
        -- Insert product mappings for newly inserted leads
        INSERT INTO LeadProductsMapping (
            MappingId,
            LeadId,
            ProductId,
            Quantity,
            IsActive,
            CreatedBy,
            CreatedOn,
            ModifiedBy,
            ModifiedOn,
            ProductName
        )
        SELECT 
            NEWID(),
            N.LeadId,
            NULL,
            1,
            1,
            @CreatedBy,
            GETDATE(),
            @CreatedBy,
            GETDATE(),
            N.ProductName
        FROM #NewLeads N
        WHERE N.IsDuplicate = 0
        AND N.ProductName IS NOT NULL
        AND LTRIM(RTRIM(N.ProductName)) != '';
        
        PRINT '[SP] Product mappings inserted: ' + CAST(@@ROWCOUNT AS NVARCHAR(10));
        
        -- Clean up temp table
        DROP TABLE #NewLeads;
        
        COMMIT TRANSACTION;
        
        PRINT '[SP] Transaction committed successfully';
        
        -- Return detailed results
        SELECT 
            @InsertedLeads AS InsertedCount,
            @DuplicateLeads AS DuplicateCount,
            @TotalLeads AS TotalProcessed,
            'Success' AS Status,
            CASE 
                WHEN @InsertedLeads = 0 AND @DuplicateLeads > 0 
                THEN 'All leads were duplicates (existing contact numbers)'
                WHEN @InsertedLeads = 0 AND @TotalLeads = 0 
                THEN 'No leads in JSON data'
                ELSE 'Leads inserted successfully'
            END AS Message;
            
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        IF OBJECT_ID('tempdb..#NewLeads') IS NOT NULL
            DROP TABLE #NewLeads;
        
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        DECLARE @ErrorLine INT = ERROR_LINE();
        
        PRINT '[SP] ERROR OCCURRED:';
        PRINT '[SP] Error Message: ' + @ErrorMessage;
        PRINT '[SP] Error Line: ' + CAST(@ErrorLine AS NVARCHAR(10));
        PRINT '[SP] Error Severity: ' + CAST(@ErrorSeverity AS NVARCHAR(10));
        
        -- Return error details
        SELECT 
            0 AS InsertedCount,
            0 AS DuplicateCount,
            0 AS TotalProcessed,
            'Error' AS Status,
            @ErrorMessage AS Message;
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateBulkImportedLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateBulkImportedLeads]
    @LeadsJSON NVARCHAR(MAX),
    @AssignedTo UNIQUEIDENTIFIER,
    @CreatedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Indian States validation list
    DECLARE @ValidStates TABLE (StateName NVARCHAR(100));
    INSERT INTO @ValidStates VALUES 
        ('Andhra Pradesh'), ('Arunachal Pradesh'), ('Assam'), ('Bihar'), 
        ('Chhattisgarh'), ('Goa'), ('Gujarat'), ('Haryana'), ('Himachal Pradesh'), 
        ('Jharkhand'), ('Karnataka'), ('Kerala'), ('Madhya Pradesh'), ('Maharashtra'), 
        ('Manipur'), ('Meghalaya'), ('Mizoram'), ('Nagaland'), ('Odisha'), 
        ('Punjab'), ('Rajasthan'), ('Sikkim'), ('Tamil Nadu'), ('Telangana'), 
        ('Tripura'), ('Uttar Pradesh'), ('Uttarakhand'), ('West Bengal');

    -- Parse JSON into temp table (AssignedTo and CreatedBy removed)
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNum,
        CompanyName, Contact, City, State, LeadTypeName, LeadSourceName,
        LeadStatusName, GSTNumber, Email, Country,
        Address, Pincode, ProductNames,
        CAST(NULL AS NVARCHAR(500)) AS ErrorMessage,
        CAST(1 AS BIT) AS IsValid
    INTO #Leads
    FROM OPENJSON(@LeadsJSON)
    WITH (
        CompanyName NVARCHAR(100) '$.CompanyName',
        Contact NVARCHAR(100) '$.Contact',
        City NVARCHAR(100) '$.City',
        State NVARCHAR(100) '$.State',
        LeadTypeName NVARCHAR(100) '$.LeadTypeName',
        LeadSourceName NVARCHAR(100) '$.LeadSourceName',
        LeadStatusName NVARCHAR(100) '$.LeadStatusName',
        GSTNumber VARCHAR(100) '$.GSTNumber',
        Email NVARCHAR(100) '$.Email',
        Country NVARCHAR(100) '$.Country',
        Address NVARCHAR(100) '$.Address',
        Pincode NVARCHAR(100) '$.Pincode',
        ProductNames NVARCHAR(MAX) '$.ProductNames'
    );

    DECLARE @TotalLeads INT = (SELECT COUNT(*) FROM #Leads);

    -- Validation (mark invalid rows, don't delete them)
    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'Company Name required' 
    WHERE CompanyName IS NULL OR LTRIM(RTRIM(CompanyName)) = '';

    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'Invalid Contact (10 digits, no leading 0)' 
    WHERE IsValid = 1 AND (Contact IS NULL OR LEN(Contact) != 10 OR Contact LIKE '%[^0-9]%' OR LEFT(Contact, 1) = '0');

    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'Contact already exists' 
    FROM #Leads t WHERE IsValid = 1 AND EXISTS (SELECT 1 FROM Leads l WHERE l.Contact = t.Contact);

    UPDATE t1 
    SET IsValid = 0, ErrorMessage = 'Duplicate Contact in batch'
    FROM #Leads t1 WHERE IsValid = 1 AND EXISTS (
        SELECT 1 FROM #Leads t2 WHERE t2.Contact = t1.Contact AND t2.RowNum < t1.RowNum
    );

    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'Invalid State' 
    FROM #Leads t WHERE IsValid = 1 AND NOT EXISTS (SELECT 1 FROM @ValidStates v WHERE v.StateName = t.State);

    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'Invalid Email format' 
    WHERE IsValid = 1 AND Email IS NOT NULL AND LTRIM(RTRIM(Email)) != '' 
        AND (Email NOT LIKE '%@%.%' OR Email LIKE '%[' + CHAR(32) + ']%' OR Email LIKE '%@%@%');

    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'Pincode must be numeric' 
    WHERE IsValid = 1 AND Pincode IS NOT NULL AND LTRIM(RTRIM(Pincode)) != '' AND Pincode LIKE '%[^0-9]%';

    UPDATE #Leads 
    SET IsValid = 0, ErrorMessage = 'At least one product required' 
    WHERE IsValid = 1 AND (ProductNames IS NULL OR LTRIM(RTRIM(ProductNames)) = '');

    -- Validate AssignedTo and CreatedBy users (global)
    IF NOT EXISTS (SELECT 1 FROM Users WHERE UserId = @AssignedTo)
    BEGIN
        RAISERROR('AssignedTo user not found.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Users WHERE UserId = @CreatedBy)
    BEGIN
        RAISERROR('CreatedBy user not found.', 16, 1);
        RETURN;
    END

    -- Process valid leads
    DECLARE @RowNum INT, @CompanyName NVARCHAR(100), @Contact NVARCHAR(100), @City NVARCHAR(100),
            @State NVARCHAR(100), @LeadTypeName NVARCHAR(100), @LeadSourceName NVARCHAR(100),
            @LeadStatusName NVARCHAR(100), @GSTNumber VARCHAR(100), @Email NVARCHAR(100),
            @Country NVARCHAR(100), @Address NVARCHAR(100), @Pincode NVARCHAR(100),
            @ProductNames NVARCHAR(MAX);

    DECLARE @LeadTypeId UNIQUEIDENTIFIER, @LeadSourceId UNIQUEIDENTIFIER, 
            @LeadStatusId UNIQUEIDENTIFIER, @NewLeadId UNIQUEIDENTIFIER;

    DECLARE cur CURSOR LOCAL FAST_FORWARD FOR 
        SELECT RowNum, CompanyName, Contact, City, State, LeadTypeName, LeadSourceName,
               LeadStatusName, GSTNumber, Email, Country, Address, Pincode, ProductNames
        FROM #Leads WHERE IsValid = 1;

    OPEN cur;
    FETCH NEXT FROM cur INTO @RowNum, @CompanyName, @Contact, @City, @State, 
        @LeadTypeName, @LeadSourceName, @LeadStatusName, @GSTNumber, @Email, 
        @Country, @Address, @Pincode, @ProductNames;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        BEGIN TRY
            BEGIN TRANSACTION;

            -- Get or create LeadType
            SELECT @LeadTypeId = LeadTypeId FROM LeadType WHERE Name = @LeadTypeName AND IsDeleted = 0;
            IF @LeadTypeId IS NULL
            BEGIN
                SET @LeadTypeId = NEWID();
                INSERT INTO LeadType (LeadTypeId, Name, IsActive, IsDeleted, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
                VALUES (@LeadTypeId, @LeadTypeName, 1, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());
            END

            -- Get or create LeadSource
            SELECT @LeadSourceId = LeadSourceId FROM LeadSource WHERE Name = @LeadSourceName AND IsDeleted = 0;
            IF @LeadSourceId IS NULL
            BEGIN
                SET @LeadSourceId = NEWID();
                INSERT INTO LeadSource (LeadSourceId, Name, IsActive, IsDeleted, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
                VALUES (@LeadSourceId, @LeadSourceName, 1, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());
            END

            -- Get or create LeadStatus
            SELECT @LeadStatusId = LeadStatusId FROM LeadStatus WHERE Name = @LeadStatusName AND IsDeleted = 0;
            IF @LeadStatusId IS NULL
            BEGIN
                SET @LeadStatusId = NEWID();
                INSERT INTO LeadStatus (LeadStatusId, Name, IsActive, IsDeleted, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
                VALUES (@LeadStatusId, @LeadStatusName, 1, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());
            END

            -- Create Lead
            SET @NewLeadId = NEWID();
            INSERT INTO Leads (LeadId, Name, Contact, City, State, LeadType, LeadSource, LeadStatus,
                AssignedTo, IsActive, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted, 
                GSTNumber, Email, Country, Address, Pincode)
            VALUES (@NewLeadId, @CompanyName, @Contact, @City, @State, @LeadTypeId, @LeadSourceId, 
                @LeadStatusId, @AssignedTo, 1, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), 0, 
                @GSTNumber, @Email, @Country, @Address, @Pincode);

            -- Insert Products (split by comma)
            DECLARE @Product NVARCHAR(MAX), @Pos INT, @List NVARCHAR(MAX) = @ProductNames;
            WHILE LEN(@List) > 0
            BEGIN
                SET @Pos = CHARINDEX(',', @List);
                IF @Pos > 0
                BEGIN
                    SET @Product = LTRIM(RTRIM(LEFT(@List, @Pos - 1)));
                    SET @List = SUBSTRING(@List, @Pos + 1, LEN(@List));
                END
                ELSE
                BEGIN
                    SET @Product = LTRIM(RTRIM(@List));
                    SET @List = '';
                END

                IF LEN(@Product) > 0
                BEGIN
                    INSERT INTO LeadProductsMapping (MappingId, LeadId, ProductId, Quantity, IsActive, 
                        CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, ProductName)
                    VALUES (NEWID(), @NewLeadId, NULL, 1, 1, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), @Product);
                END
            END

            COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
            IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
            UPDATE #Leads SET IsValid = 0, ErrorMessage = ERROR_MESSAGE() WHERE RowNum = @RowNum;
        END CATCH

        FETCH NEXT FROM cur INTO @RowNum, @CompanyName, @Contact, @City, @State, 
            @LeadTypeName, @LeadSourceName, @LeadStatusName, @GSTNumber, @Email, 
            @Country, @Address, @Pincode, @ProductNames;
    END

    CLOSE cur;
    DEALLOCATE cur;

    -- Return summary
    SELECT 'Success' AS Status, 
           @TotalLeads AS TotalLeads, 
           (SELECT COUNT(*) FROM #Leads WHERE IsValid = 1) AS SuccessCount,
           (SELECT COUNT(*) FROM #Leads WHERE IsValid = 0) AS FailedCount;

    -- Return failed leads
    SELECT CompanyName, Contact, ErrorMessage 
    FROM #Leads WHERE IsValid = 0 ORDER BY RowNum;

    DROP TABLE #Leads;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateBulkLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateBulkLeads]
@LeadsData NVARCHAR(MAX),  -- JSON array of lead data
@CreatedBy UNIQUEIDENTIFIER,
@AssignedTo UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @SuccessCount INT = 0;
    DECLARE @ErrorCount INT = 0;
    
    -- Create temporary table for errors
    CREATE TABLE #ErrorResults (
        Contact NVARCHAR(100),
        ErrorMessage NVARCHAR(MAX)
    );
    
    BEGIN TRY
        -- Parse JSON data into temporary table
        SELECT 
            JSON_VALUE(value, '$.Name') AS Name,
            JSON_VALUE(value, '$.Contact') AS Contact,
            JSON_VALUE(value, '$.City') AS City,
            JSON_VALUE(value, '$.State') AS State,
            CAST(JSON_VALUE(value, '$.Pincode') AS INT) AS Pincode,
            JSON_VALUE(value, '$.Address') AS Address,
            JSON_VALUE(value, '$.LeadType') AS LeadTypeName,
            JSON_VALUE(value, '$.LeadSource') AS LeadSourceName,
            JSON_VALUE(value, '$.LeadStatus') AS LeadStatusName
        INTO #TempLeads
        FROM OPENJSON(@LeadsData);
        
        -- Process each lead individually
        DECLARE @Name NVARCHAR(100), @Contact NVARCHAR(100), @City NVARCHAR(100), 
                @State NVARCHAR(100), @Pincode INT, @Address NVARCHAR(MAX),
                @LeadTypeName NVARCHAR(100), @LeadSourceName NVARCHAR(100), @LeadStatusName NVARCHAR(100);
        
        DECLARE @LeadTypeId UNIQUEIDENTIFIER, @LeadSourceId UNIQUEIDENTIFIER, @LeadStatusId UNIQUEIDENTIFIER;
        DECLARE @CurrentError NVARCHAR(MAX);
        
        DECLARE lead_cursor CURSOR FOR
        SELECT Name, Contact, City, State, Pincode, Address, LeadTypeName, LeadSourceName, LeadStatusName
        FROM #TempLeads;
        
        OPEN lead_cursor;
        FETCH NEXT FROM lead_cursor INTO @Name, @Contact, @City, @State, @Pincode, @Address, @LeadTypeName, @LeadSourceName, @LeadStatusName;
        
        WHILE @@FETCH_STATUS = 0
        BEGIN
            SET @CurrentError = NULL;
            SET @LeadTypeId = NULL;
            SET @LeadSourceId = NULL;
            SET @LeadStatusId = NULL;
            
            BEGIN TRY
                -- Validate required fields
                IF @Name IS NULL OR LTRIM(RTRIM(@Name)) = ''
                BEGIN
                    SET @CurrentError = 'Name is required';
                    GOTO LogError;
                END
                
                IF @Contact IS NULL OR LTRIM(RTRIM(@Contact)) = ''
                BEGIN
                    SET @CurrentError = 'Contact is required';
                    GOTO LogError;
                END
                
                -- Check if contact already exists
                IF EXISTS (SELECT 1 FROM [dbo].[Leads] WHERE [Contact] = @Contact)
                BEGIN
                    SET @CurrentError = 'Contact already exists';
                    GOTO LogError;
                END
                
                -- Handle LeadType
                SELECT @LeadTypeId = [LeadTypeId] FROM [dbo].[LeadType] WHERE [Name] = @LeadTypeName AND [IsDeleted] = 0;
                IF @LeadTypeId IS NULL
                BEGIN
                    -- Create new LeadType
                    EXEC [dbo].[sp_CreateLeadType] @LeadTypeName, @CreatedBy, 1;
                    SELECT @LeadTypeId = [LeadTypeId] FROM [dbo].[LeadType] WHERE [Name] = @LeadTypeName AND [IsDeleted] = 0;
                END
                
                -- Handle LeadSource
                SELECT @LeadSourceId = [LeadSourceId] FROM [dbo].[LeadSource] WHERE [Name] = @LeadSourceName AND [IsDeleted] = 0;
                IF @LeadSourceId IS NULL
                BEGIN
                    -- Create new LeadSource
                    EXEC [dbo].[sp_CreateLeadSource] @LeadSourceName, 1, @CreatedBy;
                    SELECT @LeadSourceId = [LeadSourceId] FROM [dbo].[LeadSource] WHERE [Name] = @LeadSourceName AND [IsDeleted] = 0;
                END
                
                -- Handle LeadStatus
                SELECT @LeadStatusId = [LeadStatusId] FROM [dbo].[LeadStatus] WHERE [Name] = @LeadStatusName AND [IsDeleted] = 0;
                IF @LeadStatusId IS NULL
                BEGIN
                    -- Create new LeadStatus
                    EXEC [dbo].[sp_CreateLeadStatus] @LeadStatusName, 1, @CreatedBy;
                    SELECT @LeadStatusId = [LeadStatusId] FROM [dbo].[LeadStatus] WHERE [Name] = @LeadStatusName AND [IsDeleted] = 0;
                END
                
                -- Validate that all IDs were resolved
                IF @LeadTypeId IS NULL
                BEGIN
                    SET @CurrentError = 'Failed to resolve or create LeadType';
                    GOTO LogError;
                END
                
                IF @LeadSourceId IS NULL
                BEGIN
                    SET @CurrentError = 'Failed to resolve or create LeadSource';
                    GOTO LogError;
                END
                
                IF @LeadStatusId IS NULL
                BEGIN
                    SET @CurrentError = 'Failed to resolve or create LeadStatus';
                    GOTO LogError;
                END
                
                -- Insert the lead
                INSERT INTO [dbo].[Leads]
                    ([Name], [Contact], [City], [State], [Pincode], [Address], 
                     [LeadType], [LeadSource], [LeadStatus], [AssignedTo],
                     [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
                VALUES
                    (@Name, @Contact, @City, @State, @Pincode, @Address,
                     @LeadTypeId, @LeadSourceId, @LeadStatusId, @AssignedTo,
                     1, 0, @CreatedBy, GETDATE(), @CreatedBy, GETDATE());
                
                SET @SuccessCount = @SuccessCount + 1;
                
            END TRY
            BEGIN CATCH
                SET @CurrentError = ERROR_MESSAGE();
                GOTO LogError;
            END CATCH
            
            GOTO NextRecord;
            
            LogError:
            INSERT INTO #ErrorResults (Contact, ErrorMessage)
            VALUES (@Contact, @CurrentError);
            SET @ErrorCount = @ErrorCount + 1;
            
            NextRecord:
            FETCH NEXT FROM lead_cursor INTO @Name, @Contact, @City, @State, @Pincode, @Address, @LeadTypeName, @LeadSourceName, @LeadStatusName;
        END
        
        CLOSE lead_cursor;
        DEALLOCATE lead_cursor;
        
        -- Return results
        SELECT 1 AS Success, 
               CONCAT('Bulk import completed. Success: ', @SuccessCount, ', Errors: ', @ErrorCount) AS Message,
               @SuccessCount AS SuccessCount,
               @ErrorCount AS ErrorCount;
        
        -- Return error details if any
        IF @ErrorCount > 0
        BEGIN
            SELECT Contact, ErrorMessage FROM #ErrorResults;
        END
        
    END TRY
    BEGIN CATCH
        CLOSE lead_cursor;
        DEALLOCATE lead_cursor;
        
        SELECT 0 AS Success, 
               ERROR_MESSAGE() AS Message,
               0 AS SuccessCount,
               0 AS ErrorCount;
    END CATCH
    
    -- Cleanup
    DROP TABLE #TempLeads;
    DROP TABLE #ErrorResults;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateLead]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE      OR ALTER PROCEDURE [dbo].[sp_CreateLead] 
@Name NVARCHAR(100),
@Contact NVARCHAR(100),
@City NVARCHAR(100),
@State NVARCHAR(100),
@LeadType UNIQUEIDENTIFIER,
@LeadSource UNIQUEIDENTIFIER,
@AssignedTo UNIQUEIDENTIFIER NULL,
@GSTNumber NVARCHAR(100),
@Email NVARCHAR(100),
@Country NVARCHAR(100),
@Address NVARCHAR(100),
@Pincode NVARCHAR(100),
@CreatedBy UNIQUEIDENTIFIER,

-- Product mapping parameters (JSON or structured format)
@ProductMappings NVARCHAR(MAX) = NULL  -- JSON: [{"ProductId":1,"ProductName":"Product A","Quantity":5}]
AS 
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @NewLeadId UNIQUEIDENTIFIER;
    
    BEGIN TRY
        -- Input validation for lead
        IF @Name IS NULL OR LTRIM(RTRIM(@Name)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid name' AS Message;
            RETURN;
        END
        ELSE IF @Contact IS NULL
        BEGIN
            SELECT 0 AS Success, 'Enter valid contact' AS Message;
            RETURN;
        END
        ELSE IF EXISTS (SELECT 1 FROM [dbo].[Leads] WHERE [Contact] = @Contact)
        BEGIN
            SELECT 0 AS Success, 'Lead contact already exists, please edit existing lead or create a lead with unique contact' AS Message;
            RETURN;
        END
        ELSE IF NOT EXISTS (SELECT 1 FROM [dbo].[LeadSource] WHERE [LeadSourceId] = @LeadSource)
        BEGIN 
            SELECT 0 AS Success, 'Select valid Lead source' AS Message;
            RETURN;
        END
        ELSE IF NOT EXISTS (SELECT 1 FROM [dbo].[LeadType] WHERE [LeadTypeId] = @LeadType)
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead type' AS Message;
            RETURN;
        END
        ELSE IF @AssignedTo IS NOT NULL AND NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @AssignedTo)
        BEGIN
            SELECT 0 AS Success, 'Select valid assigned user' AS Message;
            RETURN;
        END


        BEGIN TRANSACTION;
        
        -- Insert Lead and capture the generated LeadId
        INSERT INTO [dbo].[Leads]
            ([Name], 
            [AssignedTo], 
            [City], 
            [Contact], 
            [CreatedBy], 
            [CreatedOn], 
            [IsActive], 
            [LeadSource], 
            [LeadStatus], 
            [LeadType], 
            [ModifiedBy], 
            [ModifiedOn],  
            [State],  
			[Email],
			[Address],
			[Country],
			[Pincode],
			[GSTNumber],
            [IsDeleted])
        VALUES 
            (@Name,
            @AssignedTo,
            @City,
            @Contact,
            @CreatedBy,
            GETDATE(),
            1,
            @LeadSource,
            'BC7CE1EB-B751-4F00-9A24-9F745751BBD2',
            @LeadType,
            @CreatedBy,
            GETDATE(),
            @State,
			@Email,
			@Address,
			@Country,
			@Pincode,
			@GSTNumber,
            0);

        -- Get the newly created LeadId
        SET @NewLeadId = (SELECT [LeadId] FROM [dbo].[Leads] WHERE [Contact] = @Contact);

        -- Process product mappings if provided
        IF @ProductMappings IS NOT NULL AND LTRIM(RTRIM(@ProductMappings)) != ''
        BEGIN
            -- Parse JSON and insert product mappings
            INSERT INTO [dbo].[LeadProductsMapping]
                ([LeadId], [ProductId], [ProductName], [Quantity], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
            SELECT 
                @NewLeadId,
                JSON_VALUE(value, '$.ProductId'),
                JSON_VALUE(value, '$.ProductName'),
                JSON_VALUE(value, '$.Quantity'),
                1,
                @CreatedBy,
                GETDATE(),
                @CreatedBy,
                GETDATE()
            FROM OPENJSON(@ProductMappings);
        END

        COMMIT TRANSACTION;
        
        -- Return the new LeadId along with success message
        SELECT 1 AS Success, 'Lead and products created successfully' AS Message, @NewLeadId AS LeadId;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message, NULL AS LeadId;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateLeadSource]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateLeadSource]
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
/****** Object:  StoredProcedure [dbo].[sp_CreateLeadStatus]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateLeadStatus]
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
/****** Object:  StoredProcedure [dbo].[sp_CreateLeadType]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateLeadType]
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
/****** Object:  StoredProcedure [dbo].[sp_CreateNewFollowup]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE       OR ALTER PROCEDURE [dbo].[sp_CreateNewFollowup]
@LeadId UNIQUEIDENTIFIER,
@FollowupStatus UNIQUEIDENTIFIER,  -- Changed from @LeadStatusId
@Comments NVARCHAR(MAX),
@CreatedBy UNIQUEIDENTIFIER,
@NextFollowUpDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Lead exists and is not deleted
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or has been deleted' AS Message;
            RETURN;
        END
        
        -- Validate FollowupStatus exists and is active
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadStatus] 
            WHERE [LeadStatusId] = @FollowupStatus 
              AND [IsDeleted] = 0 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Followup Status not found or inactive' AS Message;
            RETURN;
        END
        
        -- Validate NextFollowUpDate is not in the past
        ELSE IF @NextFollowUpDate < CAST(GETDATE() AS DATE)
        BEGIN
            SELECT 0 AS Success, 'Next followup date cannot be in the past' AS Message;
            RETURN;
        END
        
        -- Validate CreatedBy user exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Users] 
            WHERE [UserId] = @CreatedBy 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Invalid user for CreatedBy' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Insert new followup with FollowupStatus
        INSERT INTO [dbo].[FollowUps]
            ([Lead], [LastFollowUpDate], [NextFollowUpDate], [Comments], 
             [FollowupStatus], [IsActive], [IsDeleted], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
        VALUES
            (@LeadId, CAST(GETDATE() AS DATE), @NextFollowUpDate, @Comments,
             @FollowupStatus, 1, 0, GETDATE(), @CreatedBy, GETDATE(), @CreatedBy);

		UPDATE [dbo].[Leads]
			SET [LeadStatus] = @FollowupStatus
				WHERE [LeadId] = @LeadId;

        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup created successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_CreateNewUser]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateNewUser]
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
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateOrder]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 4. Create Order with Products
CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateOrder]
    @LeadId UNIQUEIDENTIFIER,
    @OrderBy UNIQUEIDENTIFIER,
    @OrderDate DATE,
    @ShippingCompanyName NVARCHAR(200) = NULL,
    @ShippingEmailAddress NVARCHAR(200) = NULL,
    @ShippingAddress NVARCHAR(MAX) = NULL,
    @ShippingCity NVARCHAR(100) = NULL,
    @ShippingState NVARCHAR(100) = NULL,
    @ShippingPincode NVARCHAR(20) = NULL,
    @ShippingCountry NVARCHAR(100) = NULL,
    @IsDomestic BIT,
    @Currency NVARCHAR(3),
    @ExpectedDispatchDays INT = NULL,
    @PaymentTerms NVARCHAR(100) = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @Terms NVARCHAR(100) = NULL,
    @TaxFormat NVARCHAR(100) = NULL,
    @BasicAmount DECIMAL(18,2),
    @Discount DECIMAL(18,2) = 0,
    @Total DECIMAL(18,2),
    @SGST DECIMAL(18,2) = 0,
    @CGST DECIMAL(18,2) = 0,
    @IGST DECIMAL(18,2) = 0,
    @Tax DECIMAL(18,2) = 0,
    @RoundOff DECIMAL(18,2) = 0,
    @GrandTotal DECIMAL(18,2),
    @FinalAmount DECIMAL(18,2),
    @CreatedBy UNIQUEIDENTIFIER,
    @ProductMappings NVARCHAR(MAX) -- JSON: [{"ProductId":1,"ProductName":"X","HSNCode":"123","Quantity":5,"Rate":100,"BasicAmount":500,"Discount":0,"Tax":0,"TotalAmount":500,"ItemDescription":"desc"}]
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @NewOrderId UNIQUEIDENTIFIER;
    
    BEGIN TRY
        -- Validate Lead exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Leads] WHERE [LeadId] = @LeadId AND [IsDeleted] = 0)
        BEGIN
            SELECT 0 AS Success, 'Lead not found or deleted' AS Message;
            RETURN;
        END
        
        -- Validate OrderBy user exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @OrderBy AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Invalid user for OrderBy' AS Message;
            RETURN;
        END
        
        -- Validate amounts
        IF @BasicAmount <= 0 OR @GrandTotal <= 0
        BEGIN
            SELECT 0 AS Success, 'Invalid amount values' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Insert Order
        INSERT INTO [dbo].[Orders]
            ([OrderBy], [LeadId], [OrderDate], [ShippingCompanyName], [ShippingEmailAddress],
             [ShippingAddress], [ShippingCity], [ShippingState], [ShippingPincode], [ShippingCountry],
             [IsDomestic], [Currency], [ExpectedDispatchDays], [PaymentTerms], [Notes], [Terms],
             [TaxFormat], [BasicAmount], [Discount], [Total], [SGST], [CGST], [IGST], [Tax],
             [RoundOff], [GrandTotal], [FinalAmount], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
        VALUES
            (@OrderBy, @LeadId, @OrderDate, @ShippingCompanyName, @ShippingEmailAddress,
             @ShippingAddress, @ShippingCity, @ShippingState, @ShippingPincode, @ShippingCountry,
             @IsDomestic, @Currency, @ExpectedDispatchDays, @PaymentTerms, @Notes, @Terms,
             @TaxFormat, @BasicAmount, @Discount, @Total, @SGST, @CGST, @IGST, @Tax,
             @RoundOff, @GrandTotal, @FinalAmount, 1, GETDATE(), @CreatedBy, GETDATE(), @CreatedBy);
        
        -- Get newly created OrderId
        SET @NewOrderId = (
            SELECT TOP 1 [OrderId] 
            FROM [dbo].[Orders] 
            WHERE [CreatedBy] = @CreatedBy 
            ORDER BY [CreatedOn] DESC
        );
        
        -- Insert Product Mappings
        IF @ProductMappings IS NOT NULL AND LTRIM(RTRIM(@ProductMappings)) != ''
        BEGIN
            INSERT INTO [dbo].[OrderProductsMapping]
                ([OrderId], [ProductId], [ProductName], [HSNCode], [Quantity], [Rate],
                 [BasicAmount], [Discount], [Tax], [TotalAmount], [ItemDescription], [QuotedPrice],
                 [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
            SELECT 
                @NewOrderId,
                JSON_VALUE(value, '$.ProductId'),
                JSON_VALUE(value, '$.ProductName'),
                JSON_VALUE(value, '$.HSNCode'),
                JSON_VALUE(value, '$.Quantity'),
                JSON_VALUE(value, '$.Rate'),
                JSON_VALUE(value, '$.BasicAmount'),
                JSON_VALUE(value, '$.Discount'),
                JSON_VALUE(value, '$.Tax'),
                JSON_VALUE(value, '$.TotalAmount'),
                JSON_VALUE(value, '$.ItemDescription'),
                JSON_VALUE(value, '$.Rate'), -- QuotedPrice same as Rate
                1,
                GETDATE(),
                @CreatedBy,
                GETDATE(),
                @CreatedBy
            FROM OPENJSON(@ProductMappings);
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Order created successfully' AS Message, @NewOrderId AS OrderId;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message, NULL AS OrderId;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateQuotation]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 4. Create Quotation with Products
CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateQuotation]
    @LeadId UNIQUEIDENTIFIER,
    @QuotationBy UNIQUEIDENTIFIER,
    @QuotationDate DATE,
    @ShippingCompanyName NVARCHAR(200) = NULL,
    @ShippingEmailAddress NVARCHAR(200) = NULL,
    @ShippingAddress NVARCHAR(MAX) = NULL,
    @ShippingCity NVARCHAR(100) = NULL,
    @ShippingState NVARCHAR(100) = NULL,
    @ShippingPincode NVARCHAR(20) = NULL,
    @ShippingCountry NVARCHAR(100) = NULL,
    @IsDomestic BIT,
    @Currency NVARCHAR(3),
    @ExpectedDispatchDays INT = NULL,
    @PaymentTerms NVARCHAR(100) = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @Terms NVARCHAR(100) = NULL,
    @TaxFormat NVARCHAR(100) = NULL,
    @BasicAmount DECIMAL(18,2),
    @Discount DECIMAL(18,2) = 0,
    @Total DECIMAL(18,2),
    @SGST DECIMAL(18,2) = 0,
    @CGST DECIMAL(18,2) = 0,
    @IGST DECIMAL(18,2) = 0,
    @Tax DECIMAL(18,2) = 0,
    @RoundOff DECIMAL(18,2) = 0,
    @GrandTotal DECIMAL(18,2),
    @FinalAmount DECIMAL(18,2),
    @CreatedBy UNIQUEIDENTIFIER,
    @ProductMappings NVARCHAR(MAX) -- JSON: [{"ProductId":1,"ProductName":"X","HSNCode":"123","Quantity":5,"Rate":100,"BasicAmount":500,"Discount":0,"Tax":0,"TotalAmount":500,"ItemDescription":"desc"}]
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @NewQuotationId UNIQUEIDENTIFIER;
    
    BEGIN TRY
        -- Validate Lead exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Leads] WHERE [LeadId] = @LeadId AND [IsDeleted] = 0)
        BEGIN
            SELECT 0 AS Success, 'Lead not found or deleted' AS Message;
            RETURN;
        END
        
        -- Validate QuotationBy user exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @QuotationBy AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Invalid user for QuotationBy' AS Message;
            RETURN;
        END
        
        -- Validate amounts
        IF @BasicAmount <= 0 OR @GrandTotal <= 0
        BEGIN
            SELECT 0 AS Success, 'Invalid amount values' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Insert Quotation
        INSERT INTO [dbo].[Quotations]
            ([QuotationBy], [LeadId], [QuotationDate], [ShippingCompanyName], [ShippingEmailAddress],
             [ShippingAddress], [ShippingCity], [ShippingState], [ShippingPincode], [ShippingCountry],
             [IsDomestic], [Currency], [ExpectedDispatchDays], [PaymentTerms], [Notes], [Terms],
             [TaxFormat], [BasicAmount], [Discount], [Total], [SGST], [CGST], [IGST], [Tax],
             [RoundOff], [GrandTotal], [FinalAmount], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
        VALUES
            (@QuotationBy, @LeadId, @QuotationDate, @ShippingCompanyName, @ShippingEmailAddress,
             @ShippingAddress, @ShippingCity, @ShippingState, @ShippingPincode, @ShippingCountry,
             @IsDomestic, @Currency, @ExpectedDispatchDays, @PaymentTerms, @Notes, @Terms,
             @TaxFormat, @BasicAmount, @Discount, @Total, @SGST, @CGST, @IGST, @Tax,
             @RoundOff, @GrandTotal, @FinalAmount, 1, GETDATE(), @CreatedBy, GETDATE(), @CreatedBy);
        
        -- Get newly created QuotationId
        SET @NewQuotationId = (
            SELECT TOP 1 [QuotationId] 
            FROM [dbo].[Quotations] 
            WHERE [CreatedBy] = @CreatedBy 
            ORDER BY [CreatedOn] DESC
        );
        
        -- Insert Product Mappings
        IF @ProductMappings IS NOT NULL AND LTRIM(RTRIM(@ProductMappings)) != ''
        BEGIN
            INSERT INTO [dbo].[QuotationProductsMapping]
                ([QuotationId], [ProductId], [ProductName], [HSNCode], [Quantity], [Rate],
                 [BasicAmount], [Discount], [Tax], [TotalAmount], [ItemDescription], [QuotedPrice],
                 [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
            SELECT 
                @NewQuotationId,
                JSON_VALUE(value, '$.ProductId'),
                JSON_VALUE(value, '$.ProductName'),
                JSON_VALUE(value, '$.HSNCode'),
                JSON_VALUE(value, '$.Quantity'),
                JSON_VALUE(value, '$.Rate'),
                JSON_VALUE(value, '$.BasicAmount'),
                JSON_VALUE(value, '$.Discount'),
                JSON_VALUE(value, '$.Tax'),
                JSON_VALUE(value, '$.TotalAmount'),
                JSON_VALUE(value, '$.ItemDescription'),
                JSON_VALUE(value, '$.Rate'), -- QuotedPrice same as Rate
                1,
                GETDATE(),
                @CreatedBy,
                GETDATE(),
                @CreatedBy
            FROM OPENJSON(@ProductMappings);
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Quotation created successfully' AS Message, @NewQuotationId AS QuotationId;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message, NULL AS QuotationId;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateTargets]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateTargets]
    @TargetsJSON NVARCHAR(MAX),
    @CreatedBy UNIQUEIDENTIFIER
AS 
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION
            
            -- Use MERGE to handle insert or update
            MERGE INTO [dbo].[Targets] AS Target
            USING (
                SELECT 
                    CAST(UserID AS UNIQUEIDENTIFIER) AS UserID,
                    TotalTarget,
                    Month,
                    Year
                FROM OPENJSON(@TargetsJSON)
                WITH (
                    UserID NVARCHAR(36) '$.userId',
                    TotalTarget INT '$.target',
                    Month INT '$.month',
                    Year INT '$.year'
                )
                WHERE TotalTarget > 0
            ) AS Source
            ON Target.[UserID] = Source.UserID 
               AND Target.[Month] = Source.Month 
               AND Target.[Year] = Source.Year
            
            -- When match found, update the target
            WHEN MATCHED THEN
                UPDATE SET
                    Target.[TotalTarget] = Source.TotalTarget,
                    Target.[ModifiedOn] = GETDATE(),
                    Target.[ModifiedBy] = @CreatedBy
            
            -- When no match found, insert new target
            WHEN NOT MATCHED BY TARGET THEN
                INSERT (
                    [UserID],
                    [TotalTarget],
                    [Month],
                    [Year],
                    [IsActive],
                    [CreatedOn],
                    [CreatedBy],
                    [ModifiedOn],
                    [ModifiedBy]
                )
                VALUES (
                    Source.UserID,
                    Source.TotalTarget,
                    Source.Month,
                    Source.Year,
                    1,
                    GETDATE(),
                    @CreatedBy,
                    GETDATE(),
                    @CreatedBy
                );
            
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Targets saved successfully' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateUserType]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_CreateUserType]
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
/****** Object:  StoredProcedure [dbo].[sp_CreateUserType_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     OR ALTER PROCEDURE [dbo].[sp_CreateUserType_v1]
	@Name NVARCHAR(100),
	@IsAdmin BIT,
	@IsRegularUser BIT,
	@CreatedBy UNIQUEIDENTIFIER,
	@ModifiedBy UNIQUEIDENTIFIER,

	--------- DASHBOARD PERMISSIONS DECLARATION ----------
	@LeadPermission BIT = 0,
	@FollowupPermission BIT = 0,
	@QuotationPermission BIT = 0,
	@OrdersPermission BIT = 0,
	@TargetPermission BIT = 0,


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

			SET @LeadPermission = 1;
			SET	@FollowupPermission = 1;
			SET	@QuotationPermission = 1;
			SET	@OrdersPermission = 1;
			SET	@TargetPermission = 1;
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
	
		INSERT INTO [dbo].[UserTypeDashboardsPermissionsControl]
			([UserTypeId], [DashboardsPermissionId], [HasAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive])
		VALUES
			(@UserTypeId, (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE Name = 'Leads'), @LeadPermission, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE Name = 'Followups'), @FollowupPermission, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE Name = 'Targets'), @TargetPermission, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE Name = 'Quotations'), @QuotationPermission, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), 1),
			(@UserTypeId, (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE Name = 'Orders'), @OrdersPermission, @CreatedBy, GETDATE(), @CreatedBy, GETDATE(), 1);
		
		
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
/****** Object:  StoredProcedure [dbo].[sp_DeleteFollowupByFollowupId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 1. Delete Followup SP (Soft Delete)
CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteFollowupByFollowupId]
@FollowUpId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Check if FollowUp exists and is not already deleted
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[FollowUps] 
            WHERE [FollowUpId] = @FollowUpId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Followup not found or already deleted' AS Message;
            RETURN;
        END
        
        -- Validate ModifiedBy user exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Users] 
            WHERE [UserId] = @ModifiedBy 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Invalid user for ModifiedBy' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Perform soft delete
        UPDATE [dbo].[FollowUps]
        SET [IsDeleted] = 1,
            [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [FollowUpId] = @FollowUpId;
        
        -- Verify the update was successful
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'Failed to delete followup' AS Message;
            RETURN;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup deleted successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_DeleteLeadsByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteLeadsByLeadId]
@LeadId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate if lead exists and is not already deleted
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or already deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Soft delete the lead
        UPDATE [dbo].[Leads]
        SET [IsDeleted] = 1,
            [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [LeadId] = @LeadId;
        
        -- Verify the update was successful
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'Failed to delete lead' AS Message;
            RETURN;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Lead deleted successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_DeleteLeadSource]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteLeadSource]
@LeadSourceId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Check if LeadSource exists and is not already deleted
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadSource] 
            WHERE [LeadSourceId] = @LeadSourceId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead Source not found or already deleted' AS Message;
            RETURN;
        END
        
        -- Check for dependency - count active leads using this LeadSource
        DECLARE @LeadCount INT;
        SELECT @LeadCount = COUNT(*)
        FROM [dbo].[Leads]
        WHERE [LeadSource] = @LeadSourceId
          AND [IsDeleted] = 0;
        
        -- Restrict deletion if leads are using this LeadSource
        IF @LeadCount > 0
        BEGIN
            SELECT 0 AS Success, 
                   CONCAT('Cannot delete Lead Source. It is currently used by ', @LeadCount, ' active lead(s). Please reassign or delete the associated leads first.') AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Perform soft delete
        UPDATE [dbo].[LeadSource]
        SET [IsDeleted] = 1,
            [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [LeadSourceId] = @LeadSourceId;
        
        -- Verify the update was successful
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'Failed to delete Lead Source' AS Message;
            RETURN;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Lead Source deleted successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_DeleteLeadStatus]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteLeadStatus]
@LeadStatusId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Check if LeadStatus exists and is not already deleted
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadStatus] 
            WHERE [LeadStatusId] = @LeadStatusId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead Status not found or already deleted' AS Message;
            RETURN;
        END
        
        -- Check for dependency - count active leads using this LeadStatus
        DECLARE @LeadCount INT;
        SELECT @LeadCount = COUNT(*)
        FROM [dbo].[Leads]
        WHERE [LeadStatus] = @LeadStatusId
          AND [IsDeleted] = 0;
        
        -- Restrict deletion if leads are using this LeadStatus
        IF @LeadCount > 0
        BEGIN
            SELECT 0 AS Success, 
                   CONCAT('Cannot delete Lead Status. It is currently used by ', @LeadCount, ' active lead(s). Please reassign or delete the associated leads first.') AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Perform soft delete
        UPDATE [dbo].[LeadStatus]
        SET [IsDeleted] = 1,
            [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [LeadStatusId] = @LeadStatusId;
        
        -- Verify the update was successful
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'Failed to delete Lead Status' AS Message;
            RETURN;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Lead Status deleted successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_DeleteLeadType]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteLeadType]
@LeadTypeId UNIQUEIDENTIFIER,
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Check if LeadType exists and is not already deleted
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadType] 
            WHERE [LeadTypeId] = @LeadTypeId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead Type not found or already deleted' AS Message;
            RETURN;
        END
        
        -- Check for dependency - count active leads using this LeadType
        DECLARE @LeadCount INT;
        SELECT @LeadCount = COUNT(*)
        FROM [dbo].[Leads]
        WHERE [LeadType] = @LeadTypeId
          AND [IsDeleted] = 0;
        
        -- Restrict deletion if leads are using this LeadType
        IF @LeadCount > 0
        BEGIN
            SELECT 0 AS Success, 
                   CONCAT('Cannot delete Lead Type. It is currently used by ', @LeadCount, ' active lead(s). Please reassign or delete the associated leads first.') AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Perform soft delete
        UPDATE [dbo].[LeadType]
        SET [IsDeleted] = 1,
            [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [LeadTypeId] = @LeadTypeId;
        
        -- Verify the update was successful
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'Failed to delete Lead Type' AS Message;
            RETURN;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Lead Type deleted successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_DeleteOrderByOrderId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 6. Soft Delete Order
CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteOrderByOrderId]
    @OrderId UNIQUEIDENTIFIER,
    @ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE [OrderId] = @OrderId AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Order not found or already deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Soft delete quotation
        UPDATE [dbo].[Orders]
        SET [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [OrderId] = @OrderId;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Order deleted successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteQuotationByQuotationId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 6. Soft Delete Quotation
CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteQuotationByQuotationId]
    @QuotationId UNIQUEIDENTIFIER,
    @ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Quotations] WHERE [QuotationId] = @QuotationId AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Quotation not found or already deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Soft delete quotation
        UPDATE [dbo].[Quotations]
        SET [IsActive] = 0,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [QuotationId] = @QuotationId;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Quotation deleted successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteRefreshToken]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_DeleteRefreshToken]
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
/****** Object:  StoredProcedure [dbo].[sp_EditFollowupComments]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_EditFollowupComments]
@FollowUpId UNIQUEIDENTIFIER,
@Comments NVARCHAR(MAX),
@ModifiedBy UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate FollowUp exists and is active
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[FollowUps] 
            WHERE [FollowUpId] = @FollowUpId 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Followup not found or inactive' AS Message;
            RETURN;
        END
        
        -- Validate ModifiedBy user exists and is active
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Users] 
            WHERE [UserId] = @ModifiedBy 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Invalid user for ModifiedBy' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Update only the comments field
        UPDATE [dbo].[FollowUps]
        SET [Comments] = @Comments,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [FollowUpId] = @FollowUpId
          AND [IsActive] = 1;
        
        -- Verify the update was successful
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 0 AS Success, 'Failed to update followup comments' AS Message;
            RETURN;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup comments updated successfully' AS Message;
        
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
/****** Object:  StoredProcedure [dbo].[sp_GetAllFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetAllFollowups]
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
            GROUP BY 
                FollowUps.[FollowUpId],
                Leads.[Name],
                LeadType.[Name],
                Leads.[Contact],
                Leads.[State],
                FollowUps.[LastFollowUpDate],
                FollowUps.[NextFollowUpDate],
                FollowUps.[Comments],
                Users.[Name],
                LeadSource.[Name],
                FollowupStatusTable.[Name],
                Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0;
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads' follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND Leads.[AssignedTo] = @UserId  -- Filter by user's assigned leads
            GROUP BY 
                FollowUps.[FollowUpId],
                Leads.[Name],
                LeadType.[Name],
                Leads.[Contact],
                Leads.[State],
                FollowUps.[LastFollowUpDate],
                FollowUps.[NextFollowUpDate],
                FollowUps.[Comments],
                Users.[Name],
                LeadSource.[Name],
                FollowupStatusTable.[Name],
                Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND Leads.[AssignedTo] = @UserId;
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Data pulled successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllFollowups_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetAllFollowups_v1]
	@SearchParameter NVARCHAR(100),
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @IsAdmin BIT = 0;
        DECLARE @CleanedSearch NVARCHAR(100);
        
        -- Clean search parameter
        SET @CleanedSearch = LTRIM(RTRIM(@SearchParameter));
        IF @CleanedSearch = '' OR @CleanedSearch IS NULL
            SET @CleanedSearch = NULL;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId],
                Leads.[Name],
                LeadType.[Name],
                Leads.[Contact],
                Leads.[State],
                FollowUps.[LastFollowUpDate],
                FollowUps.[NextFollowUpDate],
                FollowUps.[Comments],
                Users.[Name],
                LeadSource.[Name],
                FollowupStatusTable.[Name],
                Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads' follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId],
                Leads.[Name],
                LeadType.[Name],
                Leads.[Contact],
                Leads.[State],
                FollowUps.[LastFollowUpDate],
                FollowUps.[NextFollowUpDate],
                FollowUps.[Comments],
                Users.[Name],
                LeadSource.[Name],
                FollowupStatusTable.[Name],
                Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Data pulled successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetAllLeads]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT  
            L.[Name] AS [Lead Name],
            L.[Contact],
            L.[City],
            L.[State],
            LT.[Name] AS [Lead Type],
            LS.[Name] AS [Lead Source],
            LST.[Name] AS [Lead Status],
            L.[AssignedTo] AS [Assigned To],
            L.[GSTNumber] AS [GST Number],
            L.[Email],
            L.[Country],
            L.[Address],
            L.[Pincode],
            STRING_AGG(CONCAT(LPM.[ProductName], '-', LPM.[Quantity]), ', ') AS [Products]
        FROM [dbo].[Leads] AS L
            INNER JOIN [dbo].[LeadProductsMapping] AS LPM
                ON L.[LeadId] = LPM.[LeadId]
            INNER JOIN [dbo].[LeadSource] AS LS
                ON L.[LeadSource] = LS.[LeadSourceId]
            INNER JOIN [dbo].[LeadStatus] AS LST
                ON L.[LeadStatus] = LST.[LeadStatusId]
            INNER JOIN [dbo].[LeadType] AS LT
                ON L.[LeadType] = LT.[LeadTypeId]
        WHERE 
            L.[IsActive] = 1 AND L.[IsDeleted] = 0
            AND LPM.[IsActive] = 1
            AND LS.[IsActive] = 1 AND LS.[IsDeleted] = 0
            AND LST.[IsActive] = 1 AND LST.[IsDeleted] = 0
            AND LT.[IsActive] = 1 AND LT.[IsDeleted] = 0
        GROUP BY
            L.[Name],
            L.[Contact],
            L.[City],
            L.[State],
            LT.[Name],
            LS.[Name],
            LST.[Name],
            L.[AssignedTo],
            L.[GSTNumber],
            L.[Email],
            L.[Country],
            L.[Address],
            L.[Pincode];

        SELECT 1 AS Success, 'Data Retrieved Successfully' AS Message;
    END TRY

    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT 0 AS Success, 'Data Retrieval Failed' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllOrder]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 2. Export All Orders (CSV Data)
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetAllOrder]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        SELECT 
            Q.[SystemGeneratedId],
            OrderByUser.[Name] AS [OrderBy],
            L.[Name] AS [LeadName],
            L.[Address] AS [LeadAddress],
            L.[City] AS [LeadCity],
            L.[State] AS [LeadState],
            L.[Contact] AS [LeadContact],
            L.[Email] AS [LeadEmail],
            L.[Pincode] AS [LeadPincode],
            CASE WHEN Q.[IsDomestic] = 1 THEN 'Domestic' ELSE 'International' END AS [DomesticInternational],
            Q.[PaymentTerms],
            Q.[Notes],
            Q.[ShippingCompanyName],
            Q.[ShippingEmailAddress],
            Q.[ShippingCity],
            Q.[ShippingState],
            Q.[ShippingPincode],
            Q.[ShippingCountry],
            Q.[BasicAmount],
            Q.[FinalAmount],
            Q.[Total],
            Q.[GrandTotal],
            -- Products formatted as "ProductName - Qty"
            STRING_AGG(CONCAT(QPM.[ProductName], ' - ', QPM.[Quantity]), ', ') AS [Products]
        FROM [dbo].[Orders] Q
            INNER JOIN [dbo].[Leads] L
                ON Q.[LeadId] = L.[LeadId]
            INNER JOIN [dbo].[Users] OrderByUser
                ON Q.[OrderBy] = OrderByUser.[UserId]
            LEFT JOIN [dbo].[OrderProductsMapping] QPM
                ON Q.[OrderId] = QPM.[OrderId]
                AND QPM.[IsActive] = 1
        WHERE Q.[IsActive] = 1
        GROUP BY 
            Q.[SystemGeneratedId], OrderByUser.[Name], L.[Name], L.[Address],
            L.[City], L.[State], L.[Contact], L.[Email], L.[Pincode],
            Q.[IsDomestic], Q.[PaymentTerms], Q.[Notes], Q.[ShippingCompanyName],
            Q.[ShippingEmailAddress], Q.[ShippingCity], Q.[ShippingState],
            Q.[ShippingPincode], Q.[ShippingCountry], Q.[BasicAmount],
            Q.[FinalAmount], Q.[Total], Q.[GrandTotal], Q.[CreatedOn]
        ORDER BY Q.[CreatedOn] DESC;
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'All quotations exported successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Failed to export quotations' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllQuotation]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 2. Export All Quotations (CSV Data)
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetAllQuotation]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        SELECT 
            Q.[SystemGeneratedId],
            QuotationByUser.[Name] AS [QuotationBy],
            L.[Name] AS [LeadName],
            L.[Address] AS [LeadAddress],
            L.[City] AS [LeadCity],
            L.[State] AS [LeadState],
            L.[Contact] AS [LeadContact],
            L.[Email] AS [LeadEmail],
            L.[Pincode] AS [LeadPincode],
            CASE WHEN Q.[IsDomestic] = 1 THEN 'Domestic' ELSE 'International' END AS [DomesticInternational],
            Q.[PaymentTerms],
            Q.[Notes],
            Q.[ShippingCompanyName],
            Q.[ShippingEmailAddress],
            Q.[ShippingCity],
            Q.[ShippingState],
            Q.[ShippingPincode],
            Q.[ShippingCountry],
            Q.[BasicAmount],
            Q.[FinalAmount],
            Q.[Total],
            Q.[GrandTotal],
            -- Products formatted as "ProductName - Qty"
            STRING_AGG(CONCAT(QPM.[ProductName], ' - ', QPM.[Quantity]), ', ') AS [Products]
        FROM [dbo].[Quotations] Q
            INNER JOIN [dbo].[Leads] L
                ON Q.[LeadId] = L.[LeadId]
            INNER JOIN [dbo].[Users] QuotationByUser
                ON Q.[QuotationBy] = QuotationByUser.[UserId]
            LEFT JOIN [dbo].[QuotationProductsMapping] QPM
                ON Q.[QuotationId] = QPM.[QuotationId]
                AND QPM.[IsActive] = 1
        WHERE Q.[IsActive] = 1
        GROUP BY 
            Q.[SystemGeneratedId], QuotationByUser.[Name], L.[Name], L.[Address],
            L.[City], L.[State], L.[Contact], L.[Email], L.[Pincode],
            Q.[IsDomestic], Q.[PaymentTerms], Q.[Notes], Q.[ShippingCompanyName],
            Q.[ShippingEmailAddress], Q.[ShippingCity], Q.[ShippingState],
            Q.[ShippingPincode], Q.[ShippingCountry], Q.[BasicAmount],
            Q.[FinalAmount], Q.[Total], Q.[GrandTotal], Q.[CreatedOn]
        ORDER BY Q.[CreatedOn] DESC;
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'All quotations exported successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Failed to export quotations' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetContactByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetContactByLeadId]
@LeadId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Lead exists
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or has been deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get contact details
        SELECT 
            L.[Contact]
        FROM [dbo].[Leads] L
        WHERE L.[LeadId] = @LeadId
          AND L.[IsDeleted] = 0;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Contact details retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch contact details' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDashboardData]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetDashboardData]
@UserID UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION

		----------------------- ACCESS LEVEL CHECK -----------------------------------------

		DECLARE @IsAdmin BIT = (SELECT 
									UT.[IsAdmin] 
										FROM [dbo].[UserType] UT 
											INNER JOIN [dbo].[Users] U 
												ON UT.[UserTypeId] = U.[UserTypeId]
												WHERE U.[UserId] = @UserID);

		DECLARE @IsRegularUser BIT = (SELECT 
										UT.[IsRegularUser] 
											FROM [dbo].[UserType] UT 
												INNER JOIN [dbo].[Users] U 
													ON UT.[UserTypeId] = U.[UserTypeId]
													WHERE U.[UserId] = @UserID);
	
		DECLARE @UserTypeId UNIQUEIDENTIFIER = (SELECT 
								[UserTypeId] 
									FROM [dbo].[Users] 
										WHERE [UserId] = @UserID);


		----------------------- DASHBOARD ACCESS LEVEL CHECK -----------------------------------------

		DECLARE @LeadsAccess BIT = 
				(SELECT 
					ISNULL(UTD.[HasAccess], 0)
						FROM [dbo].[UserTypeDashboardsPermissionsControl] UTD 
							JOIN [dbo].[DashboardsPermissions] DP
								ON UTD.[DashboardsPermissionId] = DP.[DashboardsPermissionId] 
							WHERE DP.[Name] = 'Leads' AND UTD.[UserTypeID] = @UserTypeId);

		DECLARE @TargetsAccess BIT = 
				(SELECT 
					ISNULL(UTD.[HasAccess], 0)
						FROM [dbo].[UserTypeDashboardsPermissionsControl] UTD 
							JOIN [dbo].[DashboardsPermissions] DP
								ON UTD.[DashboardsPermissionId] = DP.[DashboardsPermissionId] 
							WHERE DP.[Name] = 'Targets' AND UTD.[UserTypeID] = @UserTypeId);

		DECLARE @QuotationsAccess BIT = 
				(SELECT 
					ISNULL(UTD.[HasAccess], 0)
						FROM [dbo].[UserTypeDashboardsPermissionsControl] UTD 
							JOIN [dbo].[DashboardsPermissions] DP
								ON UTD.[DashboardsPermissionId] = DP.[DashboardsPermissionId] 
							WHERE DP.[Name] = 'Quotations' AND UTD.[UserTypeID] = @UserTypeId);

		DECLARE @OrdersAccess BIT =
				(SELECT 
					ISNULL(UTD.[HasAccess], 0)
						FROM [dbo].[UserTypeDashboardsPermissionsControl] UTD 
							JOIN [dbo].[DashboardsPermissions] DP
								ON UTD.[DashboardsPermissionId] = DP.[DashboardsPermissionId] 
							WHERE DP.[Name] = 'Orders' AND UTD.[UserTypeID] = @UserTypeId);

		DECLARE @FollowupsAccess BIT = 
				(SELECT 
					ISNULL(UTD.[HasAccess], 0)
						FROM [dbo].[UserTypeDashboardsPermissionsControl] UTD 
							JOIN [dbo].[DashboardsPermissions] DP
								ON UTD.[DashboardsPermissionId] = DP.[DashboardsPermissionId] 
							WHERE DP.[Name] = 'Followups' AND UTD.[UserTypeID] = @UserTypeId);

		SELECT @LeadsAccess AS 'Leads',
				@TargetsAccess AS 'Targets',
				@FollowupsAccess AS 'Followups',
				@QuotationsAccess AS 'Quotations',
				@OrdersAccess AS 'Orders';

		----------------------- MAIN DATA LAYER -----------------------------------------

		IF @IsAdmin = 1 AND @IsRegularUser = 1
			BEGIN
				SELECT 0 AS Success, 'User Permission Error' AS Message;
			END
		ELSE IF @IsAdmin = 0 AND @IsRegularUser = 0
			BEGIN
				SELECT 0 AS Success, 'User Permission Error' AS Message;
			END
		ELSE IF @IsAdmin = 1 AND @IsRegularUser = 0
			BEGIN
				--------------- ADMIN USER DASHBOARD DATA ------------------

				--------------- SECTION 1 DASHBOARD DATA -------------------

				IF @LeadsAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Leads]) 
											AS [All Time Lead Count],
								(SELECT COUNT(*) 
										FROM [dbo].[Leads] 
											WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) 
												AND YEAR([CreatedOn]) = YEAR(GETDATE())) 
													AS [Current Month Lead Count],
								(SELECT COUNT(*)
										FROM [dbo].[Leads]
											WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE))
												AS [Today's Leads];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to leads data' AS Message;
					END

				IF @FollowupsAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Followups]) 
											AS [All Time Followups Count],
								(SELECT COUNT(*) 
										FROM [dbo].[Followups] 
											WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) 
												AND YEAR([CreatedOn]) = YEAR(GETDATE())) 
													AS [Current Month Followups Count],
								(SELECT COUNT(*)
										FROM [dbo].[Followups]
											WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE))
												AS [Today's Followups];

					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Followup''s data' AS Message;
					END

				IF @QuotationsAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Quotations]) 
											AS [All Time Quotations Count],
								(SELECT COUNT(*) 
										FROM [dbo].[Quotations] 
											WHERE MONTH([QuotationDate]) = MONTH(GETDATE()) 
												AND YEAR([QuotationDate]) = YEAR(GETDATE())) 
													AS [Current Month Quotations Count],
								(SELECT COUNT(*)
										FROM [dbo].[Quotations]
											WHERE CAST([QuotationDate] AS DATE) = CAST(GETDATE() AS DATE))
												AS [Today's Quotations];

					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Quotation''s data' AS Message;
					END

				IF @OrdersAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Orders]) 
											AS [All Time Orders Count],
						(SELECT COUNT(*) 
								FROM [dbo].[Orders] 
									WHERE MONTH([OrderDate]) = MONTH(GETDATE()) 
										AND YEAR([OrderDate]) = YEAR(GETDATE())) 
											AS [Current Month Orders Count],
						(SELECT COUNT(*)
								FROM [dbo].[Orders]
									WHERE CAST([OrderDate] AS DATE) = CAST(GETDATE() AS DATE))
										AS [Today's Orders];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Order''s data' AS Message;
					END



				--------------- SECTION 2 DASHBOARD DATA -------------------

				IF @LeadsAccess = 1
					BEGIN
						SELECT COUNT(*) AS [Lead Count], 
								LS.[Name] AS [Lead Source] 
									FROM [dbo].[Leads] L 
										JOIN [dbo].[LeadSource] LS 
											ON L.[LeadSource] = LS.[LeadSourceId] 
								GROUP BY LS.[Name];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to leads data' AS Message;
					END


				--------------- SECTION 3 DASHBOARD DATA -------------------

				IF @LeadsAccess = 1
					BEGIN
						SELECT COUNT(*) AS [Lead Count], 
								[STATE] AS [Lead State]
									FROM [dbo].[Leads] 
									GROUP BY [STATE];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to leads data' AS Message;
					END

				
				--------------- SECTION 4 DASHBOARD DATA -------------------

				IF @TargetsAccess = 1
					BEGIN
						SELECT 
							U.[Name], 
							T.[TotalTarget],
							ISNULL(
								(
									SELECT SUM(O.[GrandTotal]) 
									FROM [dbo].[Orders] O 
									INNER JOIN [dbo].[Leads] L 
										ON O.[LeadId] = L.[LeadId] 
									WHERE L.[AssignedTo] = T.[UserID]
								), 0
							) AS [Total Collection],
							(
								(
									ISNULL(
										(
											SELECT SUM(O.[GrandTotal]) 
											FROM [dbo].[Orders] O 
											INNER JOIN [dbo].[Leads] L 
												ON O.[LeadId] = L.[LeadId] 
											WHERE L.[AssignedTo] = T.[UserID]
										), 0
									) / NULLIF(T.[TotalTarget], 0)
								) * 100
							) AS [Performance]
						FROM [dbo].[Targets] T
						JOIN [dbo].[Users] U 
							ON T.[UserID] = U.[UserId];

					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Target''s data' AS Message;
					END

				IF @FollowupsAccess = 1
					BEGIN
						SELECT TOP 10 CAST(F.[CreatedOn] AS DATE) AS [Followup Date], 
							L.[Name], 
							L.[City], 
							L.[State], 
							L.[Contact],
							LSO.[Name] AS [LeadSource],
							LST.[Name] AS [FollowupStatus],
							LT.[Name] AS [LeadType]
								FROM [dbo].[Followups] F 
									INNER JOIN [dbo].[Leads] L
										ON F.[Lead] = L.[LeadId] 
									INNER JOIN [dbo].[Users] U 
										ON L.[AssignedTo] = U.[UserId] 
									INNER JOIN [dbo].[LeadSource] LSO 
										ON L.[LeadSource] = LSO.[LeadSourceId]
									INNER JOIN [dbo].[LeadStatus] LST
										ON F.[FollowupStatus] = LST.[LeadStatusId]
									INNER JOIN [dbo].[LeadType] LT 
										ON L.[LeadType] = LT.[LeadTypeId]

								ORDER BY F.[ModifiedOn];
						SELECT 1 AS Success, 'Fetched Followup''s Data Successfully' AS Message;
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Followup''s data' AS Message;
					END

				IF @QuotationsAccess = 1
					BEGIN
						SELECT TOP 5 Q.[QuotationDate],
							L.[Name] AS [Lead Name],
							L.[City] AS [City],
							L.[State] AS [State],
							L.[Contact] AS [Contact],
							Q.[BasicAmount] AS [Basic Amount],
							Q.[FinalAmount] AS [Final Amount],
							LST.[Name] AS [Lead Status],
							LT.[Name] AS [Lead Type]
							FROM [dbo].[Quotations] Q
								INNER JOIN [dbo].[Leads] L
									ON Q.[LeadId] = L.[LeadId]
								INNER JOIN [dbo].[LeadStatus] LST
									ON L.[LeadStatus] = LST.[LeadStatusId]
								INNER JOIN [dbo].[LeadType] LT
									ON L.[LeadType] = LT.[LeadTypeId]
								ORDER BY Q.[CreatedOn];
						
						SELECT 1 AS Success, 'Fetched Quotation''s Data Successfully' AS Message;
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Quotation''s data' AS Message;
					END


				IF @OrdersAccess = 1
					BEGIN

						
					SELECT TOP 5 O.[OrderDate],
							L.[Name] AS [Lead Name],
							L.[City] AS [City],
							L.[State] AS [State],
							L.[Contact] AS [Contact],
							O.[BasicAmount] AS [Basic Amount],
							O.[FinalAmount] AS [Final Amount],
							LST.[Name] AS [Lead Status],
							LT.[Name] AS [Lead Type]
							FROM [dbo].[Orders] O
								INNER JOIN [dbo].[Leads] L
									ON O.[LeadId] = L.[LeadId]
								INNER JOIN [dbo].[LeadStatus] LST
									ON L.[LeadStatus] = LST.[LeadStatusId]
								INNER JOIN [dbo].[LeadType] LT
									ON L.[LeadType] = LT.[LeadTypeId]
								ORDER BY O.[CreatedOn];
						SELECT 1 AS Success, 'Fetched Order''s Data Successfully' AS Message;
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Order''s data' AS Message;
					END


			END
		ELSE IF @IsAdmin = 0 AND @IsRegularUser = 1
			BEGIN
				--------------- REGULAR USER DASHBOARD DATA ------------------

				--------------- SECTION 1 DASHBOARD DATA -------------------

				IF @LeadsAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Leads]) 
											AS [All Time Lead Count],
								(SELECT COUNT(*) 
										FROM [dbo].[Leads] 
											WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) 
												AND YEAR([CreatedOn]) = YEAR(GETDATE())) 
													AS [Current Month Lead Count],
								(SELECT COUNT(*)
										FROM [dbo].[Leads]
											WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE))
												AS [Today's Leads];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to leads data' AS Message;
					END

				IF @FollowupsAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Followups]) 
											AS [All Time Followups Count],
								(SELECT COUNT(*) 
										FROM [dbo].[Followups] 
											WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) 
												AND YEAR([CreatedOn]) = YEAR(GETDATE())) 
													AS [Current Month Followups Count],
								(SELECT COUNT(*)
										FROM [dbo].[Followups]
											WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE))
												AS [Today's Followups];

					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Followup''s data' AS Message;
					END

				IF @QuotationsAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Quotations]) 
											AS [All Time Quotations Count],
								(SELECT COUNT(*) 
										FROM [dbo].[Quotations] 
											WHERE MONTH([QuotationDate]) = MONTH(GETDATE()) 
												AND YEAR([QuotationDate]) = YEAR(GETDATE())) 
													AS [Current Month Quotations Count],
								(SELECT COUNT(*)
										FROM [dbo].[Quotations]
											WHERE CAST([QuotationDate] AS DATE) = CAST(GETDATE() AS DATE))
												AS [Today's Quotations];

					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Quotation''s data' AS Message;
					END

				IF @OrdersAccess = 1
					BEGIN
						SELECT (SELECT COUNT(*) 
										FROM [dbo].[Orders]) 
											AS [All Time Orders Count],
						(SELECT COUNT(*) 
								FROM [dbo].[Orders] 
									WHERE MONTH([OrderDate]) = MONTH(GETDATE()) 
										AND YEAR([OrderDate]) = YEAR(GETDATE())) 
											AS [Current Month Orders Count],
						(SELECT COUNT(*)
								FROM [dbo].[Orders]
									WHERE CAST([OrderDate] AS DATE) = CAST(GETDATE() AS DATE))
										AS [Today's Orders];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Order''s data' AS Message;
					END


				--------------- SECTION 2 DASHBOARD DATA -------------------

				IF @LeadsAccess = 1
					BEGIN
						SELECT COUNT(*) AS [Lead Count], 
								LS.[Name] AS [Lead Source]
									FROM [dbo].[Leads] L 
										JOIN [dbo].[LeadSource] LS 
											ON L.[LeadSource] = LS.[LeadSourceId] 
												WHERE L.[AssignedTo] = @UserID
								GROUP BY LS.[Name];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to leads data' AS Message;
					END


				--------------- SECTION 3 DASHBOARD DATA -------------------

				IF @LeadsAccess = 1
					BEGIN
						SELECT COUNT(*) AS [Lead Count], 
								[STATE] AS [Lead State]
									FROM [dbo].[Leads] 
										WHERE [AssignedTo] = @UserID 
									GROUP BY [STATE];
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to leads data' AS Message;
					END

				
				--------------- SECTION 4 DASHBOARD DATA -------------------

				IF @TargetsAccess = 1
					BEGIN
						SELECT 
							U.[Name], 
							T.[TotalTarget],
							ISNULL(
								(
									SELECT SUM(O.[GrandTotal]) 
									FROM [dbo].[Orders] O 
									INNER JOIN [dbo].[Leads] L 
										ON O.[LeadId] = L.[LeadId] 
									WHERE L.[AssignedTo] = T.[UserID]
								), 0
							) AS [Total Collection],
							(
								(
									ISNULL(
										(
											SELECT SUM(O.[GrandTotal]) 
											FROM [dbo].[Orders] O 
											INNER JOIN [dbo].[Leads] L 
												ON O.[LeadId] = L.[LeadId] 
											WHERE L.[AssignedTo] = T.[UserID]
										), 0
									) / NULLIF(T.[TotalTarget], 0)
								) * 100
							) AS [Performance]
						FROM [dbo].[Targets] T
						JOIN [dbo].[Users] U 
							ON T.[UserID] = U.[UserId]
								WHERE T.[UserId] = @UserID;

					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Target''s data' AS Message;
					END

				IF @FollowupsAccess = 1
					BEGIN
						SELECT TOP 10 CAST(F.[CreatedOn] AS DATE) AS [Followup Date], 
							L.[Name], 
							L.[City], 
							L.[State], 
							L.[Contact],
							LSO.[Name] AS [LeadSource],
							LST.[Name] AS [FollowupStatus],
							LT.[Name] AS [LeadType]
								FROM [dbo].[Followups] F 
									INNER JOIN [dbo].[Leads] L
										ON F.[Lead] = L.[LeadId] 
									INNER JOIN [dbo].[Users] U 
										ON L.[AssignedTo] = U.[UserId] 
									INNER JOIN [dbo].[LeadSource] LSO 
										ON L.[LeadSource] = LSO.[LeadSourceId]
									INNER JOIN [dbo].[LeadStatus] LST
										ON F.[FollowupStatus] = LST.[LeadStatusId]
									INNER JOIN [dbo].[LeadType] LT 
										ON L.[LeadType] = LT.[LeadTypeId]

								WHERE F.[CreatedBy] = @UserID
								ORDER BY F.[ModifiedOn];
						SELECT 1 AS Success, 'Fetched Followup''s Data Successfully' AS Message;
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Followup''s data' AS Message;
					END

				IF @QuotationsAccess = 1
					BEGIN
						
					SELECT TOP 5 Q.[QuotationDate],
							L.[Name] AS [Lead Name],
							L.[City] AS [City],
							L.[State] AS [State],
							L.[Contact] AS [Contact],
							Q.[BasicAmount] AS [Basic Amount],
							Q.[FinalAmount] AS [Final Amount],
							LST.[Name] AS [Lead Status],
							LT.[Name] AS [Lead Type]
							FROM [dbo].[Quotations] Q
								INNER JOIN [dbo].[Leads] L
									ON Q.[LeadId] = L.[LeadId]
								INNER JOIN [dbo].[LeadStatus] LST
									ON L.[LeadStatus] = LST.[LeadStatusId]
								INNER JOIN [dbo].[LeadType] LT
									ON L.[LeadType] = LT.[LeadTypeId]
								WHERE L.[AssignedTo] = @UserID
 								ORDER BY Q.[CreatedOn];
						SELECT 1 AS Success, 'Fetched Quotation''s Data Successfully' AS Message;
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Quotation''s data' AS Message;
					END


				IF @OrdersAccess = 1
					BEGIN
						
						SELECT TOP 5 O.[OrderDate],
								L.[Name] AS [Lead Name],
								L.[City] AS [City],
								L.[State] AS [State],
								L.[Contact] AS [Contact],
								O.[BasicAmount] AS [Basic Amount],
								O.[FinalAmount] AS [Final Amount],
								LST.[Name] AS [Lead Status],
								LT.[Name] AS [Lead Type]
								FROM [dbo].[Orders] O
									INNER JOIN [dbo].[Leads] L
										ON O.[LeadId] = L.[LeadId]
									INNER JOIN [dbo].[LeadStatus] LST
										ON L.[LeadStatus] = LST.[LeadStatusId]
									INNER JOIN [dbo].[LeadType] LT
										ON L.[LeadType] = LT.[LeadTypeId]
									WHERE L.[Assignedto] = @UserID
									ORDER BY O.[CreatedOn];
						SELECT 1 AS Success, 'Fetched Order''s Data Successfully' AS Message;
					END
				ELSE
					BEGIN 
						SELECT 0 AS Success, 'Doesn''t have access to Order''s data' AS Message;
					END

			END
		ELSE
			BEGIN
				SELECT 0 AS Success, 'Permission not sufficing, Please contact admin to get relevant permission' AS Message;
			END
		COMMIT TRANSACTION;
	END TRY


	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
	END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDashboardData_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetDashboardData_v1]
    @UserID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION

        -- Fetch user permissions in single query
        DECLARE @UserPermissions TABLE (
            IsAdmin BIT,
            IsRegularUser BIT,
            UserTypeId UNIQUEIDENTIFIER
        );

        INSERT INTO @UserPermissions
        SELECT 
            ISNULL(UT.[IsAdmin], 0),
            ISNULL(UT.[IsRegularUser], 0),
            U.[UserTypeId]
        FROM [dbo].[Users] U
        LEFT JOIN [dbo].[UserType] UT ON UT.[UserTypeId] = U.[UserTypeId]
        WHERE U.[UserId] = @UserID;

        DECLARE @IsAdmin BIT, @IsRegularUser BIT, @UserTypeId UNIQUEIDENTIFIER;
        SELECT @IsAdmin = IsAdmin, @IsRegularUser = IsRegularUser, @UserTypeId = UserTypeId
        FROM @UserPermissions;

        -- Fetch all dashboard permissions in single query
        DECLARE @DashboardPermissions TABLE (
            DashboardName NVARCHAR(50),
            HasAccess BIT,
            IconPath NVARCHAR(MAX),
            IconBGColor NVARCHAR(50),
            IconColor NVARCHAR(50)
        );

        INSERT INTO @DashboardPermissions
        SELECT 
            DP.[Name],
            ISNULL(UTD.[HasAccess], 0),
            DP.[IconPath],
            DP.[IconBGColor],
            DP.[IconColor]
        FROM [dbo].[DashboardsPermissions] DP
        LEFT JOIN [dbo].[UserTypeDashboardsPermissionsControl] UTD
            ON DP.[DashboardsPermissionId] = UTD.[DashboardsPermissionId]
            AND UTD.[UserTypeID] = @UserTypeId;

        DECLARE @LeadsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Leads'), 0);
        DECLARE @TargetsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Targets'), 0);
        DECLARE @QuotationsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Quotations'), 0);
        DECLARE @OrdersAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Orders'), 0);
        DECLARE @FollowupsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Followups'), 0);

        -- Fetch icon details for cards
        DECLARE @LeadsIcon NVARCHAR(MAX), @LeadsIconBG NVARCHAR(50), @LeadsIconColor NVARCHAR(50);
        DECLARE @FollowupsIcon NVARCHAR(MAX), @FollowupsIconBG NVARCHAR(50), @FollowupsIconColor NVARCHAR(50);
        DECLARE @QuotationsIcon NVARCHAR(MAX), @QuotationsIconBG NVARCHAR(50), @QuotationsIconColor NVARCHAR(50);
        DECLARE @OrdersIcon NVARCHAR(MAX), @OrdersIconBG NVARCHAR(50), @OrdersIconColor NVARCHAR(50);

        SELECT @LeadsIcon = IconPath, @LeadsIconBG = IconBGColor, @LeadsIconColor = IconColor 
        FROM @DashboardPermissions WHERE DashboardName = 'Leads';
        
        SELECT @FollowupsIcon = IconPath, @FollowupsIconBG = IconBGColor, @FollowupsIconColor = IconColor 
        FROM @DashboardPermissions WHERE DashboardName = 'Followups';
        
        SELECT @QuotationsIcon = IconPath, @QuotationsIconBG = IconBGColor, @QuotationsIconColor = IconColor 
        FROM @DashboardPermissions WHERE DashboardName = 'Quotations';
        
        SELECT @OrdersIcon = IconPath, @OrdersIconBG = IconBGColor, @OrdersIconColor = IconColor 
        FROM @DashboardPermissions WHERE DashboardName = 'Orders';

        -- Validate user permissions
        IF (@IsAdmin = 1 AND @IsRegularUser = 1) OR (@IsAdmin = 0 AND @IsRegularUser = 0)
        BEGIN
            SELECT CAST('{"success": 0, "message": "Invalid user permissions"}' AS NVARCHAR(MAX)) AS DashboardData;
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Build response JSON
        DECLARE @Response NVARCHAR(MAX) = '{';

        -- Permissions Section
        SET @Response += '"permissions": {';
        SET @Response += '"leads": ' + CAST(@LeadsAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"targets": ' + CAST(@TargetsAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"quotations": ' + CAST(@QuotationsAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"orders": ' + CAST(@OrdersAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"followups": ' + CAST(@FollowupsAccess AS NVARCHAR(1));
        SET @Response += '}, ';

        -- Section 1: Cards Data
        SET @Response += '"cards": {';
        
        DECLARE @CardsJson NVARCHAR(MAX) = '';

        IF @LeadsAccess = 1
        BEGIN
            DECLARE @AllTimeLeads INT = (SELECT COUNT(*) FROM [dbo].[Leads]);
            DECLARE @CurrentMonthLeads INT = (SELECT COUNT(*) FROM [dbo].[Leads] 
                WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) AND YEAR([CreatedOn]) = YEAR(GETDATE()));
            DECLARE @TodaysLeads INT = (SELECT COUNT(*) FROM [dbo].[Leads] 
                WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"leads": {"allTime": ' + CAST(@AllTimeLeads AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthLeads AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysLeads AS NVARCHAR(10)) + 
                           ', "iconPath": "' + ISNULL(@LeadsIcon, '') + '"' +
                           ', "iconBGColor": "' + ISNULL(@LeadsIconBG, '') + '"' +
                           ', "iconColor": "' + ISNULL(@LeadsIconColor, '') + '"}';
        END

        IF @FollowupsAccess = 1
        BEGIN
            DECLARE @AllTimeFollowups INT = (SELECT COUNT(*) FROM [dbo].[Followups]);
            DECLARE @CurrentMonthFollowups INT = (SELECT COUNT(*) FROM [dbo].[Followups] 
                WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) AND YEAR([CreatedOn]) = YEAR(GETDATE()));
            DECLARE @TodaysFollowups INT = (SELECT COUNT(*) FROM [dbo].[Followups] 
                WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"followups": {"allTime": ' + CAST(@AllTimeFollowups AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthFollowups AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysFollowups AS NVARCHAR(10)) + 
                           ', "iconPath": "' + ISNULL(@FollowupsIcon, '') + '"' +
                           ', "iconBGColor": "' + ISNULL(@FollowupsIconBG, '') + '"' +
                           ', "iconColor": "' + ISNULL(@FollowupsIconColor, '') + '"}';
        END

        IF @QuotationsAccess = 1
        BEGIN
            DECLARE @AllTimeQuotations INT = (SELECT COUNT(*) FROM [dbo].[Quotations]);
            DECLARE @CurrentMonthQuotations INT = (SELECT COUNT(*) FROM [dbo].[Quotations] 
                WHERE MONTH([QuotationDate]) = MONTH(GETDATE()) AND YEAR([QuotationDate]) = YEAR(GETDATE()));
            DECLARE @TodaysQuotations INT = (SELECT COUNT(*) FROM [dbo].[Quotations] 
                WHERE CAST([QuotationDate] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"quotations": {"allTime": ' + CAST(@AllTimeQuotations AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthQuotations AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysQuotations AS NVARCHAR(10)) + 
                           ', "iconPath": "' + ISNULL(@QuotationsIcon, '') + '"' +
                           ', "iconBGColor": "' + ISNULL(@QuotationsIconBG, '') + '"' +
                           ', "iconColor": "' + ISNULL(@QuotationsIconColor, '') + '"}';
        END

        IF @OrdersAccess = 1
        BEGIN
            DECLARE @AllTimeOrders INT = (SELECT COUNT(*) FROM [dbo].[Orders]);
            DECLARE @CurrentMonthOrders INT = (SELECT COUNT(*) FROM [dbo].[Orders] 
                WHERE MONTH([OrderDate]) = MONTH(GETDATE()) AND YEAR([OrderDate]) = YEAR(GETDATE()));
            DECLARE @TodaysOrders INT = (SELECT COUNT(*) FROM [dbo].[Orders] 
                WHERE CAST([OrderDate] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"orders": {"allTime": ' + CAST(@AllTimeOrders AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthOrders AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysOrders AS NVARCHAR(10)) + 
                           ', "iconPath": "' + ISNULL(@OrdersIcon, '') + '"' +
                           ', "iconBGColor": "' + ISNULL(@OrdersIconBG, '') + '"' +
                           ', "iconColor": "' + ISNULL(@OrdersIconColor, '') + '"}';
        END

        SET @Response += @CardsJson + '}, ';

        -- Section 2: Lead Source Chart
        IF @LeadsAccess = 1
        BEGIN
            SET @Response += '"leadSourceChart": ';
            
            DECLARE @LeadSourceTable TABLE (
                SourceName NVARCHAR(MAX),
                LeadCount INT
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO @LeadSourceTable
                SELECT LS.[Name], COUNT(*)
                FROM [dbo].[Leads] L
                JOIN [dbo].[LeadSource] LS ON L.[LeadSource] = LS.[LeadSourceId]
                GROUP BY LS.[Name];
            END
            ELSE
            BEGIN
                INSERT INTO @LeadSourceTable
                SELECT LS.[Name], COUNT(*)
                FROM [dbo].[Leads] L
                JOIN [dbo].[LeadSource] LS ON L.[LeadSource] = LS.[LeadSourceId]
                WHERE L.[AssignedTo] = @UserID
                GROUP BY LS.[Name];
            END
            
            DECLARE @FilterLeadSource NVARCHAR(MAX);
            SELECT @FilterLeadSource = STRING_AGG(
                '"' + REPLACE([SourceName], '"', '\"') + '": ' + CAST([LeadCount] AS NVARCHAR(10)), ','
            )
            FROM @LeadSourceTable;
            
            SET @Response += '{' + ISNULL(@FilterLeadSource, '') + '}, ';
        END

        -- Section 3: Lead State Chart
        IF @LeadsAccess = 1
        BEGIN
            SET @Response += '"leadStateChart": ';
            
            DECLARE @LeadStateTable TABLE (
                StateName NVARCHAR(MAX),
                LeadCount INT
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO @LeadStateTable
                SELECT [STATE], COUNT(*)
                FROM [dbo].[Leads]
                GROUP BY [STATE];
            END
            ELSE
            BEGIN	
                INSERT INTO @LeadStateTable
                SELECT [STATE], COUNT(*)
                FROM [dbo].[Leads]
                WHERE [AssignedTo] = @UserID
                GROUP BY [STATE];
            END
            
            DECLARE @FilterLeadState NVARCHAR(MAX);

            SELECT @FilterLeadState = STRING_AGG(
            '"' + REPLACE([StateName], '"', '\"') + '": ' + CAST([LeadCount] AS NVARCHAR(10)), ','
            )
            WITHIN GROUP (ORDER BY [LeadCount] DESC)
            FROM @LeadStateTable;

            SET @Response += '{' + ISNULL(@FilterLeadState, '') + '}, ';
        END

        -- Section 4: Tables Data
        SET @Response += '"tables": {';
        
        DECLARE @TablesJson NVARCHAR(MAX) = '';

        -- Targets Table
        IF @TargetsAccess = 1
        BEGIN
            CREATE TABLE #TempTargets (
                UserName NVARCHAR(MAX),
                TotalTarget DECIMAL(18,2),
                TotalCollection DECIMAL(18,2),
                Performance DECIMAL(10,2)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempTargets
                SELECT 
                    U.[Name],
                    T.[TotalTarget],
                    ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0),
                    ROUND(ISNULL((ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0) / NULLIF(CAST(T.[TotalTarget] AS FLOAT), 0)) * 100, 0), 2)
                FROM [dbo].[Targets] T
                JOIN [dbo].[Users] U ON T.[UserID] = U.[UserId];
            END
            ELSE
            BEGIN
                INSERT INTO #TempTargets
                SELECT 
                    U.[Name],
                    T.[TotalTarget],
                    ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0),
                    ROUND(ISNULL((ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0) / NULLIF(CAST(T.[TotalTarget] AS FLOAT), 0)) * 100, 0), 2)
                FROM [dbo].[Targets] T
                JOIN [dbo].[Users] U ON T.[UserID] = U.[UserId]
                WHERE T.[UserID] = @UserID;
            END
            
            DECLARE @TargetsData NVARCHAR(MAX);
            SELECT @TargetsData = STRING_AGG(
                '{"name":"' + REPLACE([UserName], '"', '\"') + 
                '","totalTarget":' + CAST([TotalTarget] AS NVARCHAR(20)) +
                ',"totalCollection":' + CAST([TotalCollection] AS NVARCHAR(20)) +
                ',"performance":"' + CAST(ISNULL([Performance], 0) AS NVARCHAR(10)) + '%"}', ', ')
            FROM #TempTargets;
            
            DROP TABLE #TempTargets;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"targets": [' + ISNULL(@TargetsData, '') + ']';
        END

        -- Followups Table
        IF @FollowupsAccess = 1
        BEGIN
            CREATE TABLE #TempFollowups (
                FollowupDate DATE,
                LeadName NVARCHAR(MAX),
                City NVARCHAR(MAX),
                State NVARCHAR(MAX),
                Contact NVARCHAR(MAX),
                LeadSource NVARCHAR(MAX),
                FollowupStatus NVARCHAR(MAX),
                LeadType NVARCHAR(MAX)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempFollowups
                SELECT TOP 10
                    CAST(F.[CreatedOn] AS DATE),
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    LSO.[Name],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Followups] F
                INNER JOIN [dbo].[Leads] L ON F.[Lead] = L.[LeadId]
                INNER JOIN [dbo].[LeadSource] LSO ON L.[LeadSource] = LSO.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] LST ON F.[FollowupStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                ORDER BY F.[ModifiedOn] DESC;
            END
            ELSE
            BEGIN
                INSERT INTO #TempFollowups
                SELECT TOP 10
                    CAST(F.[CreatedOn] AS DATE),
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    LSO.[Name],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Followups] F
                INNER JOIN [dbo].[Leads] L ON F.[Lead] = L.[LeadId]
                INNER JOIN [dbo].[LeadSource] LSO ON L.[LeadSource] = LSO.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] LST ON F.[FollowupStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                WHERE F.[CreatedBy] = @UserID
                ORDER BY F.[ModifiedOn] DESC;
            END
            
            DECLARE @FollowupsData NVARCHAR(MAX);
            SELECT @FollowupsData = STRING_AGG(
                '{"date":"' + CAST([FollowupDate] AS NVARCHAR(10)) +
                '","leadName":"' + REPLACE([LeadName], '"', '\"') +
                '","city":"' + REPLACE([City], '"', '\"') +
                '","state":"' + REPLACE([State], '"', '\"') +
                '","contact":"' + REPLACE([Contact], '"', '\"') +
                '","leadSource":"' + REPLACE([LeadSource], '"', '\"') +
                '","followupStatus":"' + REPLACE([FollowupStatus], '"', '\"') +
                '","leadType":"' + REPLACE([LeadType], '"', '\"') + '"}', ', ')
            FROM #TempFollowups;
            
            DROP TABLE #TempFollowups;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"followups": [' + ISNULL(@FollowupsData, '') + ']';
        END

        -- Quotations Table
        IF @QuotationsAccess = 1
        BEGIN
            CREATE TABLE #TempQuotations (
                QuotationDate DATE,
                LeadName NVARCHAR(MAX),
                City NVARCHAR(MAX),
                State NVARCHAR(MAX),
                Contact NVARCHAR(MAX),
                BasicAmount DECIMAL(18,2),
                FinalAmount DECIMAL(18,2),
                LeadStatus NVARCHAR(MAX),
                LeadType NVARCHAR(MAX)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempQuotations
                SELECT TOP 5
                    Q.[QuotationDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    Q.[BasicAmount],
                    Q.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                ORDER BY Q.[CreatedOn] DESC;
            END
            ELSE
            BEGIN
                INSERT INTO #TempQuotations
                SELECT TOP 5
                    Q.[QuotationDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    Q.[BasicAmount],
                    Q.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                WHERE L.[AssignedTo] = @UserID
                ORDER BY Q.[CreatedOn] DESC;
            END
            
            DECLARE @QuotationsData NVARCHAR(MAX);
            SELECT @QuotationsData = STRING_AGG(
                '{"date":"' + CAST([QuotationDate] AS NVARCHAR(10)) +
                '","leadName":"' + REPLACE([LeadName], '"', '\"') +
                '","city":"' + REPLACE([City], '"', '\"') +
                '","state":"' + REPLACE([State], '"', '\"') +
                '","contact":"' + REPLACE([Contact], '"', '\"') +
                '","basicAmount":' + CAST([BasicAmount] AS NVARCHAR(15)) +
                ',"finalAmount":' + CAST([FinalAmount] AS NVARCHAR(15)) +
                ',"leadStatus":"' + REPLACE([LeadStatus], '"', '\"') +
                '","leadType":"' + REPLACE([LeadType], '"', '\"') + '"}', ', ')
            FROM #TempQuotations;
            
            DROP TABLE #TempQuotations;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"quotations": [' + ISNULL(@QuotationsData, '') + ']';
        END

        -- Orders Table
        IF @OrdersAccess = 1
        BEGIN
            CREATE TABLE #TempOrders (
                OrderDate DATE,
                LeadName NVARCHAR(MAX),
                City NVARCHAR(MAX),
                State NVARCHAR(MAX),
                Contact NVARCHAR(MAX),
                BasicAmount DECIMAL(18,2),
                FinalAmount DECIMAL(18,2),
                LeadStatus NVARCHAR(MAX),
                LeadType NVARCHAR(MAX)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempOrders
                SELECT TOP 5
                    O.[OrderDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    O.[BasicAmount],
                    O.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Orders] O
                INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                ORDER BY O.[CreatedOn] DESC;
            END
            ELSE
            BEGIN
                INSERT INTO #TempOrders
                SELECT TOP 5
                    O.[OrderDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    O.[BasicAmount],
                    O.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Orders] O
                INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                WHERE L.[AssignedTo] = @UserID
                ORDER BY O.[CreatedOn] DESC;
            END
            
            DECLARE @OrdersData NVARCHAR(MAX);
            SELECT @OrdersData = STRING_AGG(
                '{"date":"' + CAST([OrderDate] AS NVARCHAR(10)) +
                '","leadName":"' + REPLACE([LeadName], '"', '\"') +
                '","city":"' + REPLACE([City], '"', '\"') +
                '","state":"' + REPLACE([State], '"', '\"') +
                '","contact":"' + REPLACE([Contact], '"', '\"') +
                '","basicAmount":' + CAST([BasicAmount] AS NVARCHAR(15)) +
                ',"finalAmount":' + CAST([FinalAmount] AS NVARCHAR(15)) +
                ',"leadStatus":"' + REPLACE([LeadStatus], '"', '\"') +
                '","leadType":"' + REPLACE([LeadType], '"', '\"') + '"}', ', ')
            FROM #TempOrders;
            
            DROP TABLE #TempOrders;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"orders": [' + ISNULL(@OrdersData, '') + ']';
        END

        SET @Response += @TablesJson + '}';
        SET @Response += ', "success": 1, "message": "Dashboard data fetched successfully"}';

        SELECT CAST(@Response AS NVARCHAR(MAX)) AS DashboardData;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT CAST('{"success": 0, "message": "' + REPLACE(ERROR_MESSAGE(), '"', '\"') + '"}' AS NVARCHAR(MAX)) AS DashboardData;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDashboardData_v2]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[sp_GetDashboardData_v2]
    @UserID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION

        -- Fetch user permissions in single query
        DECLARE @UserPermissions TABLE (
            IsAdmin BIT,
            IsRegularUser BIT,
            UserTypeId UNIQUEIDENTIFIER
        );

        INSERT INTO @UserPermissions
        SELECT 
            ISNULL(UT.[IsAdmin], 0),
            ISNULL(UT.[IsRegularUser], 0),
            U.[UserTypeId]
        FROM [dbo].[Users] U
        LEFT JOIN [dbo].[UserType] UT ON UT.[UserTypeId] = U.[UserTypeId]
        WHERE U.[UserId] = @UserID;

        DECLARE @IsAdmin BIT, @IsRegularUser BIT, @UserTypeId UNIQUEIDENTIFIER;
        SELECT @IsAdmin = IsAdmin, @IsRegularUser = IsRegularUser, @UserTypeId = UserTypeId
        FROM @UserPermissions;

        -- Fetch all dashboard permissions in single query
        DECLARE @DashboardPermissions TABLE (
            DashboardName NVARCHAR(50),
            HasAccess BIT
        );

        INSERT INTO @DashboardPermissions
        SELECT 
            DP.[Name],
            ISNULL(UTD.[HasAccess], 0)
        FROM [dbo].[DashboardsPermissions] DP
        LEFT JOIN [dbo].[UserTypeDashboardsPermissionsControl] UTD
            ON DP.[DashboardsPermissionId] = UTD.[DashboardsPermissionId]
            AND UTD.[UserTypeID] = @UserTypeId;

        DECLARE @LeadsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Leads'), 0);
        DECLARE @TargetsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Targets'), 0);
        DECLARE @QuotationsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Quotations'), 0);
        DECLARE @OrdersAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Orders'), 0);
        DECLARE @FollowupsAccess BIT = ISNULL((SELECT HasAccess FROM @DashboardPermissions WHERE DashboardName = 'Followups'), 0);

        -- Validate user permissions
        IF (@IsAdmin = 1 AND @IsRegularUser = 1) OR (@IsAdmin = 0 AND @IsRegularUser = 0)
        BEGIN
            SELECT CAST('{"success": 0, "message": "Invalid user permissions"}' AS NVARCHAR(MAX)) AS DashboardData;
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Build response JSON
        DECLARE @Response NVARCHAR(MAX) = '{';

        -- Permissions Section
        SET @Response += '"permissions": {';
        SET @Response += '"leads": ' + CAST(@LeadsAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"targets": ' + CAST(@TargetsAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"quotations": ' + CAST(@QuotationsAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"orders": ' + CAST(@OrdersAccess AS NVARCHAR(1)) + ',';
        SET @Response += '"followups": ' + CAST(@FollowupsAccess AS NVARCHAR(1));
        SET @Response += '}, ';

        -- Section 1: Cards Data
        SET @Response += '"cards": {';
        
        DECLARE @CardsJson NVARCHAR(MAX) = '';

        IF @LeadsAccess = 1
        BEGIN
            DECLARE @AllTimeLeads INT = (SELECT COUNT(*) FROM [dbo].[Leads]);
            DECLARE @CurrentMonthLeads INT = (SELECT COUNT(*) FROM [dbo].[Leads] 
                WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) AND YEAR([CreatedOn]) = YEAR(GETDATE()));
            DECLARE @TodaysLeads INT = (SELECT COUNT(*) FROM [dbo].[Leads] 
                WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"leads": {"allTime": ' + CAST(@AllTimeLeads AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthLeads AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysLeads AS NVARCHAR(10)) + '}';
        END

        IF @FollowupsAccess = 1
        BEGIN
            DECLARE @AllTimeFollowups INT = (SELECT COUNT(*) FROM [dbo].[Followups]);
            DECLARE @CurrentMonthFollowups INT = (SELECT COUNT(*) FROM [dbo].[Followups] 
                WHERE MONTH([CreatedOn]) = MONTH(GETDATE()) AND YEAR([CreatedOn]) = YEAR(GETDATE()));
            DECLARE @TodaysFollowups INT = (SELECT COUNT(*) FROM [dbo].[Followups] 
                WHERE CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"followups": {"allTime": ' + CAST(@AllTimeFollowups AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthFollowups AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysFollowups AS NVARCHAR(10)) + '}';
        END

        IF @QuotationsAccess = 1
        BEGIN
            DECLARE @AllTimeQuotations INT = (SELECT COUNT(*) FROM [dbo].[Quotations]);
            DECLARE @CurrentMonthQuotations INT = (SELECT COUNT(*) FROM [dbo].[Quotations] 
                WHERE MONTH([QuotationDate]) = MONTH(GETDATE()) AND YEAR([QuotationDate]) = YEAR(GETDATE()));
            DECLARE @TodaysQuotations INT = (SELECT COUNT(*) FROM [dbo].[Quotations] 
                WHERE CAST([QuotationDate] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"quotations": {"allTime": ' + CAST(@AllTimeQuotations AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthQuotations AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysQuotations AS NVARCHAR(10)) + '}';
        END

        IF @OrdersAccess = 1
        BEGIN
            DECLARE @AllTimeOrders INT = (SELECT COUNT(*) FROM [dbo].[Orders]);
            DECLARE @CurrentMonthOrders INT = (SELECT COUNT(*) FROM [dbo].[Orders] 
                WHERE MONTH([OrderDate]) = MONTH(GETDATE()) AND YEAR([OrderDate]) = YEAR(GETDATE()));
            DECLARE @TodaysOrders INT = (SELECT COUNT(*) FROM [dbo].[Orders] 
                WHERE CAST([OrderDate] AS DATE) = CAST(GETDATE() AS DATE));
            
            IF LEN(@CardsJson) > 0 SET @CardsJson += ', ';
            SET @CardsJson += '"orders": {"allTime": ' + CAST(@AllTimeOrders AS NVARCHAR(10)) + 
                           ', "currentMonth": ' + CAST(@CurrentMonthOrders AS NVARCHAR(10)) + 
                           ', "today": ' + CAST(@TodaysOrders AS NVARCHAR(10)) + '}';
        END

        SET @Response += @CardsJson + '}, ';

        -- Section 2: Lead Source Chart
        IF @LeadsAccess = 1
        BEGIN
            SET @Response += '"leadSourceChart": ';
            
            DECLARE @LeadSourceTable TABLE (
                SourceName NVARCHAR(MAX),
                LeadCount INT
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO @LeadSourceTable
                SELECT LS.[Name], COUNT(*)
                FROM [dbo].[Leads] L
                JOIN [dbo].[LeadSource] LS ON L.[LeadSource] = LS.[LeadSourceId]
                GROUP BY LS.[Name];
            END
            ELSE
            BEGIN
                INSERT INTO @LeadSourceTable
                SELECT LS.[Name], COUNT(*)
                FROM [dbo].[Leads] L
                JOIN [dbo].[LeadSource] LS ON L.[LeadSource] = LS.[LeadSourceId]
                WHERE L.[AssignedTo] = @UserID
                GROUP BY LS.[Name];
            END
            
            DECLARE @FilterLeadSource NVARCHAR(MAX);
            SELECT @FilterLeadSource = STRING_AGG(
                '"' + REPLACE([SourceName], '"', '\"') + '": ' + CAST([LeadCount] AS NVARCHAR(10)), ','
            )
            FROM @LeadSourceTable;
            
            SET @Response += '{' + ISNULL(@FilterLeadSource, '') + '}, ';
        END

        -- Section 3: Lead State Chart
        IF @LeadsAccess = 1
        BEGIN
            SET @Response += '"leadStateChart": ';
            
            DECLARE @LeadStateTable TABLE (
                StateName NVARCHAR(MAX),
                LeadCount INT
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO @LeadStateTable
                SELECT [STATE], COUNT(*)
                FROM [dbo].[Leads]
                GROUP BY [STATE];
            END
            ELSE
            BEGIN	
                INSERT INTO @LeadStateTable
                SELECT [STATE], COUNT(*)
                FROM [dbo].[Leads]
                WHERE [AssignedTo] = @UserID
                GROUP BY [STATE];
            END
            
            DECLARE @FilterLeadState NVARCHAR(MAX);

            SELECT @FilterLeadState = STRING_AGG(
            '"' + REPLACE([StateName], '"', '\"') + '": ' + CAST([LeadCount] AS NVARCHAR(10)), ','
            )
            WITHIN GROUP (ORDER BY [LeadCount] DESC)
            FROM @LeadStateTable;

            SET @Response += '{' + ISNULL(@FilterLeadState, '') + '}, ';
        END

        -- Section 4: Tables Data
        SET @Response += '"tables": {';
        
        DECLARE @TablesJson NVARCHAR(MAX) = '';

        -- Targets Table
        IF @TargetsAccess = 1
        BEGIN
            CREATE TABLE #TempTargets (
                UserName NVARCHAR(MAX),
                TotalTarget DECIMAL(18,2),
                TotalCollection DECIMAL(18,2),
                Performance DECIMAL(10,2)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempTargets
                SELECT 
                    U.[Name],
                    T.[TotalTarget],
                    ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0),
                    ROUND(ISNULL((ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0) / NULLIF(CAST(T.[TotalTarget] AS FLOAT), 0)) * 100, 0), 2)
                FROM [dbo].[Targets] T
                JOIN [dbo].[Users] U ON T.[UserID] = U.[UserId];
            END
            ELSE
            BEGIN
                INSERT INTO #TempTargets
                SELECT 
                    U.[Name],
                    T.[TotalTarget],
                    ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0),
                    ROUND(ISNULL((ISNULL((SELECT SUM(O.[GrandTotal]) FROM [dbo].[Orders] O 
                        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId] 
                        WHERE L.[AssignedTo] = T.[UserID]), 0) / NULLIF(CAST(T.[TotalTarget] AS FLOAT), 0)) * 100, 0), 2)
                FROM [dbo].[Targets] T
                JOIN [dbo].[Users] U ON T.[UserID] = U.[UserId]
                WHERE T.[UserID] = @UserID;
            END
            
            DECLARE @TargetsData NVARCHAR(MAX);
            SELECT @TargetsData = STRING_AGG(
                '{"name":"' + REPLACE([UserName], '"', '\"') + 
                '","totalTarget":' + CAST([TotalTarget] AS NVARCHAR(20)) +
                ',"totalCollection":' + CAST([TotalCollection] AS NVARCHAR(20)) +
                ',"performance":"' + CAST(ISNULL([Performance], 0) AS NVARCHAR(10)) + '%"}', ', ')
            FROM #TempTargets;
            
            DROP TABLE #TempTargets;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"targets": [' + ISNULL(@TargetsData, '') + ']';
        END

        -- Followups Table
        IF @FollowupsAccess = 1
        BEGIN
            CREATE TABLE #TempFollowups (
                FollowupDate DATE,
                LeadName NVARCHAR(MAX),
                City NVARCHAR(MAX),
                State NVARCHAR(MAX),
                Contact NVARCHAR(MAX),
                LeadSource NVARCHAR(MAX),
                FollowupStatus NVARCHAR(MAX),
                LeadType NVARCHAR(MAX)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempFollowups
                SELECT TOP 10
                    CAST(F.[CreatedOn] AS DATE),
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    LSO.[Name],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Followups] F
                INNER JOIN [dbo].[Leads] L ON F.[Lead] = L.[LeadId]
                INNER JOIN [dbo].[LeadSource] LSO ON L.[LeadSource] = LSO.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] LST ON F.[FollowupStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                ORDER BY F.[ModifiedOn] DESC;
            END
            ELSE
            BEGIN
                INSERT INTO #TempFollowups
                SELECT TOP 10
                    CAST(F.[CreatedOn] AS DATE),
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    LSO.[Name],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Followups] F
                INNER JOIN [dbo].[Leads] L ON F.[Lead] = L.[LeadId]
                INNER JOIN [dbo].[LeadSource] LSO ON L.[LeadSource] = LSO.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] LST ON F.[FollowupStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                WHERE F.[CreatedBy] = @UserID
                ORDER BY F.[ModifiedOn] DESC;
            END
            
            DECLARE @FollowupsData NVARCHAR(MAX);
            SELECT @FollowupsData = STRING_AGG(
                '{"date":"' + CAST([FollowupDate] AS NVARCHAR(10)) +
                '","leadName":"' + REPLACE([LeadName], '"', '\"') +
                '","city":"' + REPLACE([City], '"', '\"') +
                '","state":"' + REPLACE([State], '"', '\"') +
                '","contact":"' + REPLACE([Contact], '"', '\"') +
                '","leadSource":"' + REPLACE([LeadSource], '"', '\"') +
                '","followupStatus":"' + REPLACE([FollowupStatus], '"', '\"') +
                '","leadType":"' + REPLACE([LeadType], '"', '\"') + '"}', ', ')
            FROM #TempFollowups;
            
            DROP TABLE #TempFollowups;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"followups": [' + ISNULL(@FollowupsData, '') + ']';
        END

        -- Quotations Table
        IF @QuotationsAccess = 1
        BEGIN
            CREATE TABLE #TempQuotations (
                QuotationDate DATE,
                LeadName NVARCHAR(MAX),
                City NVARCHAR(MAX),
                State NVARCHAR(MAX),
                Contact NVARCHAR(MAX),
                BasicAmount DECIMAL(18,2),
                FinalAmount DECIMAL(18,2),
                LeadStatus NVARCHAR(MAX),
                LeadType NVARCHAR(MAX)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempQuotations
                SELECT TOP 5
                    Q.[QuotationDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    Q.[BasicAmount],
                    Q.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                ORDER BY Q.[CreatedOn] DESC;
            END
            ELSE
            BEGIN
                INSERT INTO #TempQuotations
                SELECT TOP 5
                    Q.[QuotationDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    Q.[BasicAmount],
                    Q.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                WHERE L.[AssignedTo] = @UserID
                ORDER BY Q.[CreatedOn] DESC;
            END
            
            DECLARE @QuotationsData NVARCHAR(MAX);
            SELECT @QuotationsData = STRING_AGG(
                '{"date":"' + CAST([QuotationDate] AS NVARCHAR(10)) +
                '","leadName":"' + REPLACE([LeadName], '"', '\"') +
                '","city":"' + REPLACE([City], '"', '\"') +
                '","state":"' + REPLACE([State], '"', '\"') +
                '","contact":"' + REPLACE([Contact], '"', '\"') +
                '","basicAmount":' + CAST([BasicAmount] AS NVARCHAR(15)) +
                ',"finalAmount":' + CAST([FinalAmount] AS NVARCHAR(15)) +
                ',"leadStatus":"' + REPLACE([LeadStatus], '"', '\"') +
                '","leadType":"' + REPLACE([LeadType], '"', '\"') + '"}', ', ')
            FROM #TempQuotations;
            
            DROP TABLE #TempQuotations;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"quotations": [' + ISNULL(@QuotationsData, '') + ']';
        END

        -- Orders Table
        IF @OrdersAccess = 1
        BEGIN
            CREATE TABLE #TempOrders (
                OrderDate DATE,
                LeadName NVARCHAR(MAX),
                City NVARCHAR(MAX),
                State NVARCHAR(MAX),
                Contact NVARCHAR(MAX),
                BasicAmount DECIMAL(18,2),
                FinalAmount DECIMAL(18,2),
                LeadStatus NVARCHAR(MAX),
                LeadType NVARCHAR(MAX)
            );
            
            IF @IsAdmin = 1
            BEGIN
                INSERT INTO #TempOrders
                SELECT TOP 5
                    O.[OrderDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    O.[BasicAmount],
                    O.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Orders] O
                INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                ORDER BY O.[CreatedOn] DESC;
            END
            ELSE
            BEGIN
                INSERT INTO #TempOrders
                SELECT TOP 5
                    O.[OrderDate],
                    L.[Name],
                    ISNULL(L.[City], ''),
                    ISNULL(L.[State], ''),
                    ISNULL(L.[Contact], ''),
                    O.[BasicAmount],
                    O.[FinalAmount],
                    LST.[Name],
                    LT.[Name]
                FROM [dbo].[Orders] O
                INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[LeadStatus] LST ON L.[LeadStatus] = LST.[LeadStatusId]
                INNER JOIN [dbo].[LeadType] LT ON L.[LeadType] = LT.[LeadTypeId]
                WHERE L.[AssignedTo] = @UserID
                ORDER BY O.[CreatedOn] DESC;
            END
            
            DECLARE @OrdersData NVARCHAR(MAX);
            SELECT @OrdersData = STRING_AGG(
                '{"date":"' + CAST([OrderDate] AS NVARCHAR(10)) +
                '","leadName":"' + REPLACE([LeadName], '"', '\"') +
                '","city":"' + REPLACE([City], '"', '\"') +
                '","state":"' + REPLACE([State], '"', '\"') +
                '","contact":"' + REPLACE([Contact], '"', '\"') +
                '","basicAmount":' + CAST([BasicAmount] AS NVARCHAR(15)) +
                ',"finalAmount":' + CAST([FinalAmount] AS NVARCHAR(15)) +
                ',"leadStatus":"' + REPLACE([LeadStatus], '"', '\"') +
                '","leadType":"' + REPLACE([LeadType], '"', '\"') + '"}', ', ')
            FROM #TempOrders;
            
            DROP TABLE #TempOrders;
            
            IF LEN(@TablesJson) > 0 SET @TablesJson += ', ';
            SET @TablesJson += '"orders": [' + ISNULL(@OrdersData, '') + ']';
        END

        SET @Response += @TablesJson + '}';
        SET @Response += ', "success": 1, "message": "Dashboard data fetched successfully"}';

        SELECT CAST(@Response AS NVARCHAR(MAX)) AS DashboardData;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT CAST('{"success": 0, "message": "' + REPLACE(ERROR_MESSAGE(), '"', '\"') + '"}' AS NVARCHAR(MAX)) AS DashboardData;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDealClosedFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetDealClosedFollowups]
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
			IF @IsAdmin = 1
        BEGIN
            -- Admin sees all deal closed follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus],
                Leads.[LeadId]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed'
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[LastFollowUpDate] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed';
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads' deal closed follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus],
                Leads.[LeadId]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed'
                AND Leads.[AssignedTo] = @UserId  -- Filter by user's assigned leads
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[LastFollowUpDate] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed'
                AND Leads.[AssignedTo] = @UserId;
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Deal closed followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDealClosedFollowups_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetDealClosedFollowups_v1]
	@SearchParameter NVARCHAR(100),
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @IsAdmin BIT = 0;
        DECLARE @CleanedSearch NVARCHAR(100);
        
        SET @CleanedSearch = LTRIM(RTRIM(@SearchParameter));
        IF @CleanedSearch = '' OR @CleanedSearch IS NULL
            SET @CleanedSearch = NULL;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed'
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        ELSE
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed'
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Deal Closed'
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Deal Closed followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetExpiredFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetExpiredFollowups]
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all expired follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus],
                Leads.[LeadId]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE);
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads' expired follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus],
                Leads.[LeadId]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId  -- Filter by user's assigned leads
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId;
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Expired followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetExpiredFollowups_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetExpiredFollowups_v1]
	@SearchParameter NVARCHAR(100),
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @IsAdmin BIT = 0;
        DECLARE @CleanedSearch NVARCHAR(100);
        
        SET @CleanedSearch = LTRIM(RTRIM(@SearchParameter));
        IF @CleanedSearch = '' OR @CleanedSearch IS NULL
            SET @CleanedSearch = NULL;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        ELSE
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
               AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] < CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Expired followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetExportedFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE       OR ALTER PROCEDURE [dbo].[sp_GetExportedFollowups]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        SELECT 
            Leads.[Name] AS [Lead Name],
            LeadType.[Name] AS [Lead Type],
            Leads.[Contact],
            Leads.[State],
			Leads.[Pincode],
			Leads.[Address],
			Leads.[GSTNumber] AS [GST Number],
			Leads.[Email],
			Leads.[Country],
            CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [Last FollowUp Date],
            CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [Next FollowUp Date],
            FollowUps.[Comments],
            STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
            Users.[Name] AS [Assigned User],
            LeadSource.[Name] AS [Lead Source],
            FollowupStatusTable.[Name] AS [Followup Status]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
            LEFT JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
            LEFT JOIN [dbo].[LeadProductsMapping]
                ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                AND LeadProductsMapping.[IsActive] = 1
        WHERE 
            FollowUps.[IsActive] = 1
            AND Leads.[IsDeleted] = 0
        GROUP BY 
            FollowUps.[FollowUpId],
            Leads.[Name],
            LeadType.[Name],
            Leads.[Contact],
            Leads.[State],
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            Users.[Name],
            LeadSource.[Name],
            FollowupStatusTable.[Name],
			Leads.[LEadId],
			Leads.[Pincode],
			Leads.[Address],
			Leads.[GSTNumber],
			Leads.[Email],
			Leads.[Country]
        ORDER BY FollowUps.[NextFollowUpDate] ASC;
        
       
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Data pulled successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Cannot fetch Followups data' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFollowupByFollowupId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     OR ALTER PROCEDURE [dbo].[sp_GetFollowupByFollowupId]
@FollowUpId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[FollowUps] 
            WHERE [FollowUpId] = @FollowUpId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Followup not found or has been deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        SELECT 
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[CreatedOn],
            Users.[Name] AS [AssignedTo],
            FollowupStatusTable.[Name] AS [FollowupStatus]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            LEFT JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
            LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
            LEFT JOIN [dbo].[LeadProductsMapping]
                ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                AND LeadProductsMapping.[IsActive] = 1
        WHERE 
            FollowUps.[FollowUpId] = @FollowUpId
            AND FollowUps.[IsDeleted] = 0
        GROUP BY 
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[CreatedOn],
            Users.[Name],
            FollowupStatusTable.[Name];
        

		SELECT 
            LeadProductsMapping.[ProductId],
            LeadProductsMapping.[ProductName],
            LeadProductsMapping.[Quantity]
        FROM [dbo].[LeadProductsMapping]
		INNER JOIN 
			[dbo].[Leads] 
				ON [LeadProductsMapping].[LeadId] = Leads.LeadId
		INNER JOIN
			[dbo].[FollowUps]
				ON Leads.[LeadId] = FollowUps.[Lead]
        WHERE Followups.[FollowupId] = @FollowupId
		AND LeadProductsMapping.[IsActive] = 1;

        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Cannot fetch followup details' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE         OR ALTER PROCEDURE [dbo].[sp_GetFollowups]
@FilterType NVARCHAR(50),
@LimitParameter INT,
@OffsetParameter INT,
@UserId UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate FilterType parameter
        IF @FilterType NOT IN ('All', 'Upcoming', 'Expired', 'Not Interested', 'Deal Closed')
        BEGIN
            SELECT 0 AS Success, 'Invalid FilterType. Valid values are: All, Upcoming, Expired, Not Interested, Deal Closed' AS Message;
            RETURN;
        END
        
        -- Execute appropriate stored procedure based on FilterType with pagination
        IF @FilterType = 'All'
        BEGIN
            EXEC [dbo].[sp_GetAllFollowups] @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Upcoming'
        BEGIN
            EXEC [dbo].[sp_GetUpcomingFollowups] @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Expired'
        BEGIN
            EXEC [dbo].[sp_GetExpiredFollowups] @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Not Interested'
        BEGIN
            EXEC [dbo].[sp_GetNotInterestedFollowups] @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Deal Closed'
        BEGIN
            EXEC [dbo].[sp_GetDealClosedFollowups] @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFollowups_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetFollowups_v1]
@SearchParameter NVARCHAR(100),
@FilterType NVARCHAR(50),
@LimitParameter INT,
@OffsetParameter INT,
@UserId UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate FilterType parameter
        IF @FilterType NOT IN ('All', 'Upcoming', 'Expired', 'Not Interested', 'Deal Closed')
        BEGIN
            SELECT 0 AS Success, 'Invalid FilterType. Valid values are: All, Upcoming, Expired, Not Interested, Deal Closed' AS Message;
            RETURN;
        END
        
        -- Execute appropriate stored procedure based on FilterType with pagination
        IF @FilterType = 'All'
        BEGIN
            EXEC [dbo].[sp_GetAllFollowups_v1] @SearchParameter = @SearchParameter, @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Upcoming'
        BEGIN
            EXEC [dbo].[sp_GetUpcomingFollowups_v1] @SearchParameter = @SearchParameter, @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Expired'
        BEGIN
            EXEC [dbo].[sp_GetExpiredFollowups_v1] @SearchParameter = @SearchParameter, @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Not Interested'
        BEGIN
            EXEC [dbo].[sp_GetNotInterestedFollowups_v1] @SearchParameter = @SearchParameter, @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        ELSE IF @FilterType = 'Deal Closed'
        BEGIN
            EXEC [dbo].[sp_GetDealClosedFollowups_v1] @SearchParameter = @SearchParameter, @LimitParameter = @LimitParameter, @OffsetParameter = @OffsetParameter, @UserId = @UserId;
        END
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFollowupsByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- 2. Get Followups by Lead ID SP (Historical)
CREATE     OR ALTER PROCEDURE [dbo].[sp_GetFollowupsByLeadId]
@LeadId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Lead exists
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or has been deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get all followups for this lead with related information
        SELECT 
            FollowUps.[FollowUpId],
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[IsActive],
            FollowUps.[CreatedOn],
            CreatedByUser.[Name] AS [CreatedBy],
            FollowUps.[ModifiedOn],
            ModifiedByUser.[Name] AS [ModifiedBy],
            -- Lead information at the time of followup
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadContact],
            LeadStatus.[Name] AS [LeadStatus],
            LeadType.[Name] AS [LeadType],
            LeadSource.[Name] AS [LeadSource]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadStatus]
                ON FollowUps.[FollowupStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            LEFT JOIN [dbo].[Users] AS CreatedByUser
                ON FollowUps.[CreatedBy] = CreatedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS ModifiedByUser
                ON FollowUps.[ModifiedBy] = ModifiedByUser.[UserId]
        WHERE 
            FollowUps.[Lead] = @LeadId
        ORDER BY FollowUps.[CreatedOn] DESC;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup history retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch followup history' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFollowupsByOrderId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 2. Get Followups by Lead ID SP (Historical)
CREATE       OR ALTER PROCEDURE [dbo].[sp_GetFollowupsByOrderId]
@OrderId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY

		DECLARE @LeadId UNIQUEIDENTIFIER = (SELECT [LeadId] FROM [dbo].[Orders] WHERE [OrderId] = @OrderId)
        -- Validate Lead exists
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or has been deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get all followups for this lead with related information
        SELECT 
            FollowUps.[FollowUpId],
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[IsActive],
            FollowUps.[CreatedOn],
            CreatedByUser.[Name] AS [CreatedBy],
            FollowUps.[ModifiedOn],
            ModifiedByUser.[Name] AS [ModifiedBy],
            -- Lead information at the time of followup
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadContact],
            LeadStatus.[Name] AS [LeadStatus],
            LeadType.[Name] AS [LeadType],
            LeadSource.[Name] AS [LeadSource]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadStatus]
                ON FollowUps.[FollowupStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            LEFT JOIN [dbo].[Users] AS CreatedByUser
                ON FollowUps.[CreatedBy] = CreatedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS ModifiedByUser
                ON FollowUps.[ModifiedBy] = ModifiedByUser.[UserId]
        WHERE 
            FollowUps.[Lead] = @LeadId
        ORDER BY FollowUps.[CreatedOn] DESC;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup history retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch followup history' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFollowupsByQuotationId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE       OR ALTER PROCEDURE [dbo].[sp_GetFollowupsByQuotationId]
@QuotationId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY

		DECLARE @LeadId UNIQUEIDENTIFIER = (SELECT [LeadId] FROM [dbo].[Quotations] WHERE [QuotationId] = @QuotationId)
        -- Validate Lead exists
        IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or has been deleted' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get all followups for this lead with related information
        SELECT 
            FollowUps.[FollowUpId],
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[IsActive],
            FollowUps.[CreatedOn],
            CreatedByUser.[Name] AS [CreatedBy],
            FollowUps.[ModifiedOn],
            ModifiedByUser.[Name] AS [ModifiedBy],
            -- Lead information at the time of followup
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadContact],
            LeadStatus.[Name] AS [LeadStatus],
            LeadType.[Name] AS [LeadType],
            LeadSource.[Name] AS [LeadSource]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadStatus]
                ON FollowUps.[FollowupStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            LEFT JOIN [dbo].[Users] AS CreatedByUser
                ON FollowUps.[CreatedBy] = CreatedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS ModifiedByUser
                ON FollowUps.[ModifiedBy] = ModifiedByUser.[UserId]
        WHERE 
            FollowUps.[Lead] = @LeadId
        ORDER BY FollowUps.[CreatedOn] DESC;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Followup history retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch followup history' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLastFollowupByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE         OR ALTER PROCEDURE [dbo].[sp_GetLastFollowupByLeadId]
@LeadId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    
    BEGIN TRY
        
        -- Validate Order exists
        IF @LeadId IS NULL
        BEGIN
            SELECT 0 AS Success, 'Lead not found or inactive' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get the most recent followup for the lead associated with this quotation
        SELECT TOP 1
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[CreatedOn],
            CreatedByUser.[Name] AS [CreatedBy],
            FollowUps.[ModifiedOn],
            ModifiedByUser.[Name] AS [ModifiedBy],
            -- Lead info
            AssignedUser.[Name] AS [AssignedTo]
        FROM [dbo].[FollowUps]
            LEFT JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            LEFT JOIN [dbo].[Users] AS CreatedByUser
                ON FollowUps.[CreatedBy] = CreatedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS ModifiedByUser
                ON FollowUps.[ModifiedBy] = ModifiedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS AssignedUser
                ON Leads.[AssignedTo] = AssignedUser.[UserId]
        WHERE 
            FollowUps.[Lead] = @LeadId
            AND FollowUps.[IsDeleted] = 0
        ORDER BY FollowUps.[CreatedOn] DESC;
        
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Last followup retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch last followup' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLastFollowupByOrderId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE       OR ALTER PROCEDURE [dbo].[sp_GetLastFollowupByOrderId]
@OrderId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @LeadId UNIQUEIDENTIFIER;
    
    BEGIN TRY
        -- Get LeadId from Order
        SELECT @LeadId = [LeadId] 
        FROM [dbo].[Orders] 
        WHERE [OrderId] = @OrderId 
          AND [IsActive] = 1;
        
        -- Validate Order exists
        IF @LeadId IS NULL
        BEGIN
            SELECT 0 AS Success, 'Order not found or inactive' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get the most recent followup for the lead associated with this quotation
        SELECT TOP 1
            FollowUps.[FollowUpId],
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[CreatedOn],
            CreatedByUser.[Name] AS [CreatedBy],
            FollowUps.[ModifiedOn],
            ModifiedByUser.[Name] AS [ModifiedBy],
            -- Lead info
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadContact],
            FollowUps.[FollowupStatus],
            AssignedUser.[Name] AS [AssignedTo]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            LEFT JOIN [dbo].[Users] AS CreatedByUser
                ON FollowUps.[CreatedBy] = CreatedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS ModifiedByUser
                ON FollowUps.[ModifiedBy] = ModifiedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS AssignedUser
                ON Leads.[AssignedTo] = AssignedUser.[UserId]
        WHERE 
            FollowUps.[Lead] = @LeadId
            AND FollowUps.[IsDeleted] = 0
        ORDER BY FollowUps.[CreatedOn] DESC;
        
       
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Last followup retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch last followup' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLastFollowupByQuotationId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     OR ALTER PROCEDURE [dbo].[sp_GetLastFollowupByQuotationId]
@QuotationId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @LeadId UNIQUEIDENTIFIER;
    
    BEGIN TRY
        -- Get LeadId from Quotation
        SELECT @LeadId = [LeadId] 
        FROM [dbo].[Quotations] 
        WHERE [QuotationId] = @QuotationId 
          AND [IsActive] = 1;
        
        -- Validate Quotation exists
        IF @LeadId IS NULL
        BEGIN
            SELECT 0 AS Success, 'Quotation not found or inactive' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Get the most recent followup for the lead associated with this quotation
        SELECT TOP 1
            FollowUps.[FollowUpId],
            FollowUps.[LastFollowUpDate],
            FollowUps.[NextFollowUpDate],
            FollowUps.[Comments],
            FollowUps.[CreatedOn],
            CreatedByUser.[Name] AS [CreatedBy],
            FollowUps.[ModifiedOn],
            ModifiedByUser.[Name] AS [ModifiedBy],
            -- Lead info
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadContact],
            FollowUps.[FollowupStatus],
            AssignedUser.[Name] AS [AssignedTo]
        FROM [dbo].[FollowUps]
            INNER JOIN [dbo].[Leads]
                ON FollowUps.[Lead] = Leads.[LeadId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            LEFT JOIN [dbo].[Users] AS CreatedByUser
                ON FollowUps.[CreatedBy] = CreatedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS ModifiedByUser
                ON FollowUps.[ModifiedBy] = ModifiedByUser.[UserId]
            LEFT JOIN [dbo].[Users] AS AssignedUser
                ON Leads.[AssignedTo] = AssignedUser.[UserId]
        WHERE 
            FollowUps.[Lead] = @LeadId
            AND FollowUps.[IsDeleted] = 0
        ORDER BY FollowUps.[CreatedOn] DESC;
        
       
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Last followup retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 0 AS Success, 'Cannot fetch last followup' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE         OR ALTER PROCEDURE [dbo].[sp_GetLeadByLeadId]
    @LeadId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Lead Details (First Result Set)
        SELECT 
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadPhoneNumber],
            CONCAT(Leads.[City],', ',Leads.[State]) AS [LeadAddress],
			Leads.[GSTNumber],
			Leads.[Address],
			Leads.[Country],
			Leads.[Email],
			Leads.[Pincode],

			LeadType.[LeadTypeId] AS [LeadTypeId],
            LeadType.[Name] AS [LeadType],

			LeadSource.[LeadSourceId] AS [LeadSourceId],
            LeadSource.[Name] AS [LeadSource],

			LeadStatus.[LeadStatusId] AS [LeadStatusId],
            LeadStatus.[Name] AS [Status],

			Users.[UserId] AS [UserId],
            Users.[Name] AS [AssignedTo]
        FROM [dbo].[Leads]	
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
			LEFT JOIN [dbo].[Users]
				ON Leads.[AssignedTo] = Users.[UserId]
        WHERE Leads.[LeadId] = @LeadId 
          AND Leads.[IsDeleted] = 0;
        
        -- Lead Products (Second Result Set)
        SELECT 
            [ProductId],
            [ProductName],
            [Quantity]
        FROM [dbo].[LeadProductsMapping]
        WHERE [LeadId] = @LeadId
		AND [IsActive] = 1;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Data retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Data retrieval failed' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadDetailsDDN]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 3. Get Lead Details for Dropdown
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadDetailsDDN]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            L.[LeadId],
            L.[Name]
        FROM [dbo].[Leads] L
        WHERE L.[IsActive] = 1
          AND L.[IsDeleted] = 0
        ORDER BY L.[Name];
        
        SELECT 1 AS Success, 'Lead details retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadProductsByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadProductsByLeadId]
	@LeadId UNIQUEIDENTIFIER 
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION

		SELECT [ProductId],
		[ProductName],
		[Quantity]
			FROM [dbo].[LeadProductsMapping]
				WHERE [LeadId] = @LeadId;

		COMMIT TRANSACTION
		SELECT 1 AS Success, 'Data Retrieved Successfully' AS Message;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION

		SELECT 0 AS Success, 'Data not found' AS Message;
	END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     OR ALTER PROCEDURE [dbo].[sp_GetLeads]
    @SearchParameter NVARCHAR(100) = NULL,
    @LimitParameter INT,
    @OffsetParameter INT,
    @StatusParam UNIQUEIDENTIFIER = NULL,
    @LeadTypeId UNIQUEIDENTIFIER = NULL,
    @LeadSourceId UNIQUEIDENTIFIER = NULL,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        -- Main query with conditional filtering
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all leads
            SELECT 
                Leads.[LeadId], 
                Leads.[Name],
                Leads.[Contact],
                Leads.[State],
                FORMAT((SELECT TOP 1 [LastFollowUpDate] 
                        FROM [dbo].[FollowUps] 
                        WHERE Followups.[Lead] = Leads.[LeadId] 
                        ORDER BY [LastFollowUpDate] DESC), 'dd-MM-yyyy') AS [LastFollowUpDate],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedTo],
                Leads.[LeadSource] AS [LeadSourceId],
                LeadSource.[Name] AS [LeadSource],
                Leads.[LeadStatus] AS [LeadStatusId],
                LeadStatus.[Name] AS [Status],
                Leads.[LeadType] AS [LeadTypeId],
                LeadType.[Name] AS [LeadType]
            FROM [dbo].[Leads]
            INNER JOIN [dbo].[LeadProductsMapping]
                ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                Leads.[IsDeleted] = 0 
                AND LeadProductsMapping.[IsActive] = 1
                AND LeadSource.[IsActive] = 1
                AND LeadSource.[IsDeleted] = 0
                AND LeadType.[IsActive] = 1
                AND LeadType.[IsDeleted] = 0
                AND LeadStatus.[IsActive] = 1
                AND LeadStatus.[IsDeleted] = 0
                AND Leads.[AssignedTo] IS NOT NULL
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR Leads.[Name] LIKE '%' + @SearchParameter + '%'
                    OR Leads.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@StatusParam IS NULL OR Leads.[LeadStatus] = @StatusParam)
                AND (@LeadTypeId IS NULL OR Leads.[LeadType] = @LeadTypeId)
                AND (@LeadSourceId IS NULL OR Leads.[LeadSource] = @LeadSourceId)
            GROUP BY 
                Leads.[LeadId], 
                Leads.[Name],
                Leads.[Contact],
                Leads.[State],
                Leads.[AssignedTo],
                Leads.[LeadSource], 
                LeadSource.[Name],
                Leads.[LeadStatus], 
                LeadStatus.[Name],
                Leads.[LeadType], 
                LeadType.[Name],
                Users.[Name],
                Leads.[ModifiedOn]
            ORDER BY Leads.[ModifiedOn], Leads.[Name]
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;

            -- Count query for admin
            SELECT COUNT(DISTINCT Leads.[LeadId]) AS 'Total Count'
            FROM [dbo].[Leads]
            INNER JOIN [dbo].[LeadProductsMapping]
                ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                Leads.[IsDeleted] = 0
                AND Leads.[AssignedTo] IS NOT NULL
                AND LeadSource.[IsActive] = 1
                AND LeadSource.[IsDeleted] = 0
                AND LeadType.[IsActive] = 1
                AND LeadType.[IsDeleted] = 0
                AND LeadStatus.[IsActive] = 1
                AND LeadStatus.[IsDeleted] = 0
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR Leads.[Name] LIKE '%' + @SearchParameter + '%'
                    OR Leads.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@StatusParam IS NULL OR Leads.[LeadStatus] = @StatusParam)
                AND (@LeadTypeId IS NULL OR Leads.[LeadType] = @LeadTypeId)
                AND (@LeadSourceId IS NULL OR Leads.[LeadSource] = @LeadSourceId);
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads
            SELECT 
                Leads.[LeadId], 
                Leads.[Name],
                Leads.[Contact],
                Leads.[State],
                FORMAT((SELECT TOP 1 [LastFollowUpDate] 
                        FROM [dbo].[FollowUps] 
                        WHERE Followups.[Lead] = Leads.[LeadId] 
                        ORDER BY [LastFollowUpDate] DESC), 'dd-MM-yyyy') AS [LastFollowUpDate],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedTo],
                Leads.[LeadSource] AS [LeadSourceId],
                LeadSource.[Name] AS [LeadSource],
                Leads.[LeadStatus] AS [LeadStatusId],
                LeadStatus.[Name] AS [Status],
                Leads.[LeadType] AS [LeadTypeId],
                LeadType.[Name] AS [LeadType]
            FROM [dbo].[Leads]
            INNER JOIN [dbo].[LeadProductsMapping]
                ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                Leads.[IsDeleted] = 0 
                AND LeadProductsMapping.[IsActive] = 1
                AND LeadSource.[IsActive] = 1
                AND LeadSource.[IsDeleted] = 0
                AND LeadType.[IsActive] = 1
                AND LeadType.[IsDeleted] = 0
                AND LeadStatus.[IsActive] = 1
                AND LeadStatus.[IsDeleted] = 0
                AND Leads.[AssignedTo] IS NOT NULL
                AND Leads.[AssignedTo] = @UserId  -- Filter by user
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR Leads.[Name] LIKE '%' + @SearchParameter + '%'
                    OR Leads.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@StatusParam IS NULL OR Leads.[LeadStatus] = @StatusParam)
                AND (@LeadTypeId IS NULL OR Leads.[LeadType] = @LeadTypeId)
                AND (@LeadSourceId IS NULL OR Leads.[LeadSource] = @LeadSourceId)
            GROUP BY 
                Leads.[LeadId], 
                Leads.[Name],
                Leads.[Contact],
                Leads.[State],
                Leads.[AssignedTo],
                Leads.[LeadSource], 
                LeadSource.[Name],
                Leads.[LeadStatus], 
                LeadStatus.[Name],
                Leads.[LeadType], 
                LeadType.[Name],
                Users.[Name],
				Leads.[ModifiedOn]
            ORDER BY Leads.[ModifiedOn], Leads.[Name]
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;

            -- Count query for regular user
            SELECT COUNT(DISTINCT Leads.[LeadId]) AS 'Total Count'
            FROM [dbo].[Leads]
            INNER JOIN [dbo].[LeadProductsMapping]
                ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                Leads.[IsDeleted] = 0
                AND Leads.[AssignedTo] IS NOT NULL
                AND Leads.[AssignedTo] = @UserId  -- Filter by user
                AND LeadSource.[IsActive] = 1
                AND LeadSource.[IsDeleted] = 0
                AND LeadType.[IsActive] = 1
                AND LeadType.[IsDeleted] = 0
                AND LeadStatus.[IsActive] = 1
                AND LeadStatus.[IsDeleted] = 0
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR Leads.[Name] LIKE '%' + @SearchParameter + '%'
                    OR Leads.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@StatusParam IS NULL OR Leads.[LeadStatus] = @StatusParam)
                AND (@LeadTypeId IS NULL OR Leads.[LeadType] = @LeadTypeId)
                AND (@LeadSourceId IS NULL OR Leads.[LeadSource] = @LeadSourceId);
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Data retrieved successfully' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadsExported]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadsExported]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY	
        BEGIN TRANSACTION;
        
        -- Main leads query with products as JSON
        SELECT 
            Leads.[LeadId],
            Leads.[Name],
            Users.[Name] AS [AssignedTo],
            Leads.[City],
            Leads.[State],
            Leads.[Contact],
            Leads.[CreatedBy],
            Leads.[CreatedOn],
            LeadStatus.[Name] AS [LeadStatus],
            LeadType.[Name] AS [LeadType],
            LeadSource.[Name] AS [LeadSource],
            -- Products as nested JSON array
            ISNULL(
                (
                    SELECT 
                        LPM.[ProductId],
                        LPM.[ProductName],
                        LPM.[Quantity]
                    FROM [dbo].[LeadProductsMapping] LPM
                    WHERE LPM.[LeadId] = Leads.[LeadId]
                      AND LPM.[IsActive] = 1
                    FOR JSON PATH
                ), 
                '[]'
            ) AS [Products]
        FROM [dbo].[Leads]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            LEFT JOIN [dbo].[Users]
                ON Leads.[AssignedTo] = Users.[UserId]
        WHERE Leads.[IsDeleted] = 0
		AND
		LeadSource.[IsActive] = 1
		AND 
		LeadSource.[IsDeleted] = 0
		AND
		LeadType.[IsActive] = 1
		AND
		LeadType.[IsDeleted] = 0
		AND
		LeadStatus.[IsActive] = 1
		AND
		LeadStatus.[IsDeleted] = 0
        ORDER BY Leads.[CreatedOn] DESC;
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Data fetched successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Data retrieval failed' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadsForDDN]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE       OR ALTER PROCEDURE [dbo].[sp_GetLeadsForDDN]
@UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
	DECLARE @IsAdmin BIT = 0;
        
    SELECT @IsAdmin = UT.[IsAdmin]
		FROM [dbo].[Users] U
			INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
		IF @IsAdmin = 0
		BEGIN
			SELECT 
			    [LeadId],
				[Name]
			FROM [dbo].[Leads]
				WHERE [IsActive] = 1
			AND [IsDeleted] = 0
			AND [AssignedTo] = @UserId
				ORDER BY [Name];
		END
		
		ELSE
		BEGIN
			SELECT
				[LeadId],
				[Name]
			FROM [dbo].[Leads]
				WHERE [IsActive] = 1
			AND [IsDeleted] = 0
			AND [AssignedTo] IS NOT NULL
				ORDER BY [Name];
		END
        
        SELECT 1 AS Success, 'Leads retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadSource]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadSource]
AS 
BEGIN
	SELECT [LeadSourceId], 
			[Name],
			[IsActive] AS [Status],
			[CreatedOn]
		FROM [dbo].[LeadSource]
		WHERE [IsDeleted] = 0;
	SELECT 1 AS Success, 'Data retrieval successful' AS Message;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadSourceForLeadDDN]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 16. [dbo].[sp_GetLeadSourceForLeadDDN]
-- 17. [dbo].[sp_GetLeadTypeForLeadDDN]
-- 18. [dbo].[sp_GetLeadStatusForLeadDDN]
-- 19. [dbo].[sp_GetUsersForAdminDDNLeads]
-- Merge GetLeadByLeadId and GetLEadProductsByLEadId
-- Merge GetLeadsByLeadId and GetUnAssignedLeadByLEadId

-- 16. Get Lead Sources for Dropdown (DDN = DropDownNavigation)
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadSourceForLeadDDN]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            [LeadSourceId],
            [Name]
        FROM [dbo].[LeadSource]
        WHERE [IsActive] = 1 
          AND [IsDeleted] = 0
        ORDER BY [Name];
        
        SELECT 1 AS Success, 'Lead sources retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadStatus]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadStatus]
AS
BEGIN
	SELECT [LeadStatusId], 
			[Name],
			[IsActive] AS [Status],
			[CreatedOn]
		FROM [dbo].[LeadStatus]
		WHERE [IsDeleted] = 0;
	SELECT 1 AS Success, 'Data retrieval successful' AS Message;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadStatusForLeadDDN]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 18. Get Lead Status for Dropdown
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadStatusForLeadDDN]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            [LeadStatusId],
            [Name]
        FROM [dbo].[LeadStatus]
        WHERE [IsActive] = 1 
          AND [IsDeleted] = 0
        ORDER BY [Name];
        
        SELECT 1 AS Success, 'Lead statuses retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadType]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadType]
AS
BEGIN
	SELECT [LeadTypeId], 
			[Name],
			[IsActive] AS [Status],
			[CreatedOn]
		FROM [dbo].[LeadType]
		WHERE [IsDeleted] = 0;
	SELECT 1 AS Success, 'Data retrieval successful' AS Message;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetLeadTypeForLeadDDN]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 17. Get Lead Types for Dropdown
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetLeadTypeForLeadDDN]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            [LeadTypeId],
            [Name]
        FROM [dbo].[LeadType]
        WHERE [IsActive] = 1 
          AND [IsDeleted] = 0
        ORDER BY [Name];
        
        SELECT 1 AS Success, 'Lead types retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNotInterestedFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetNotInterestedFollowups]
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all not interested follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus],
                Leads.[LeadId]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[LastFollowUpDate] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested';
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads' not interested follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus],
                Leads.[LeadId]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
                AND Leads.[AssignedTo] = @UserId  -- Filter by user's assigned leads
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[LastFollowUpDate] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
                AND Leads.[AssignedTo] = @UserId;
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Not interested followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNotInterestedFollowups_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetNotInterestedFollowups_v1]
	@SearchParameter NVARCHAR(100),
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @IsAdmin BIT = 0;
        DECLARE @CleanedSearch NVARCHAR(100);
        
        SET @CleanedSearch = LTRIM(RTRIM(@SearchParameter));
        IF @CleanedSearch = '' OR @CleanedSearch IS NULL
            SET @CleanedSearch = NULL;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        ELSE
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowupStatusTable.[Name] = 'Not Interested'
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Not Interested followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetOrder]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetOrder]
    @SearchParameter NVARCHAR(100) = NULL,
    @LimitParameter INT = 25,
    @OffsetParameter INT = 0,
    @IsDomestic BIT = NULL,
    @AssignedTo UNIQUEIDENTIFIER = NULL,
    @UserId UNIQUEIDENTIFIER  -- Added parameter for current user
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        -- Main query with conditional filtering based on user type
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all quotations
            SELECT 
                Q.[OrderId],
                Q.[SystemGeneratedId],
                OrderByUser.[Name] AS [OrderCreatedBy],
                L.[Name] AS [LeadName],
                L.[Contact],
                Q.[CreatedOn] AS [LeadCreatedOnDate],
                CONCAT(L.[City], ' - ', L.[State]) AS [CityState],
                STRING_AGG(QPM.[ProductName], ', ') AS [Products],
                Q.[BasicAmount],
                Q.[FinalAmount],
                Q.[IsDomestic]
            FROM [dbo].[Orders] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[Users] OrderByUser
                    ON Q.[OrderBy] = OrderByUser.[UserId]
                INNER JOIN [dbo].[LeadType] LT
                    ON L.[LeadType] = LT.[LeadTypeId]
                LEFT JOIN [dbo].[OrderProductsMapping] QPM
                    ON Q.[OrderId] = QPM.[OrderId]
                    AND QPM.[IsActive] = 1
            WHERE 
                Q.[IsActive] = 1
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo)
            GROUP BY 
                Q.[SystemGeneratedId], 
                OrderByUser.[Name], 
                L.[Name], 
                Q.[CreatedOn],
                L.[City], 
                L.[State], 
                Q.[BasicAmount], 
                Q.[FinalAmount], 
                LT.[Name], 
                Q.[OrderId], 
                Q.[IsDomestic], 
                L.[Contact]
            ORDER BY Q.[CreatedOn] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(DISTINCT Q.[OrderId]) AS 'TotalCount'
            FROM [dbo].[Orders] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
            WHERE 
                Q.[IsActive] = 1
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo);
        END
        ELSE
        BEGIN
            -- Regular user sees only quotations for leads assigned to them
            SELECT 
                Q.[OrderId],
                Q.[SystemGeneratedId],
                OrderByUser.[Name] AS [OrderCreatedBy],
                L.[Name] AS [LeadName],
                L.[Contact],
                Q.[CreatedOn] AS [LeadCreatedOnDate],
                CONCAT(L.[City], ' - ', L.[State]) AS [CityState],
                STRING_AGG(QPM.[ProductName], ', ') AS [Products],
                Q.[BasicAmount],
                Q.[FinalAmount],
                Q.[IsDomestic]
            FROM [dbo].[Orders] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[Users] OrderByUser
                    ON Q.[OrderBy] = OrderByUser.[UserId]
                INNER JOIN [dbo].[LeadType] LT
                    ON L.[LeadType] = LT.[LeadTypeId]
                LEFT JOIN [dbo].[OrderProductsMapping] QPM
                    ON Q.[OrderId] = QPM.[OrderId]
                    AND QPM.[IsActive] = 1
            WHERE 
                Q.[IsActive] = 1
                AND L.[AssignedTo] = @UserId  -- Filter by user's assigned leads
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo)
            GROUP BY 
                Q.[SystemGeneratedId], 
                OrderByUser.[Name], 
                L.[Name], 
                Q.[CreatedOn],
                L.[City], 
                L.[State], 
                Q.[BasicAmount], 
                Q.[FinalAmount], 
                LT.[Name], 
                Q.[OrderId], 
                Q.[IsDomestic], 
                L.[Contact]
            ORDER BY Q.[CreatedOn] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(DISTINCT Q.[OrderId]) AS 'TotalCount'
            FROM [dbo].[Orders] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
            WHERE 
                Q.[IsActive] = 1
                AND L.[AssignedTo] = @UserId  -- Filter by user's assigned leads
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo);
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Orders retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_GetOrderByOrderId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- 5. Get Order by OrderId (View/Download)
CREATE     OR ALTER PROCEDURE [dbo].[sp_GetOrderByOrderId]
    @OrderId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE [OrderId] = @OrderId AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Order not found' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Order Header Details
        SELECT 
            Q.[SystemGeneratedId],
            Q.[OrderDate],
            DATEADD(DAY, Q.[ExpectedDispatchDays], Q.[OrderDate]) AS [ExpectedDispatchDate],
			Q.[ExpectedDispatchDays],
            Q.[PaymentTerms],
            -- Billing Details
            L.[Name] AS [BillingCompanyName],
            L.[City] AS [BillingCity],
            L.[Contact] AS [ContactNumber],
            L.[Email] AS [BillingEmail],
            L.[GSTNumber],
            L.[State] AS [BillingState],
            L.[Country] AS [BillingCountry],
            L.[Address] AS [BillingAddress],
            L.[Pincode] AS [BillingPincode],
            -- Shipping Details
            Q.[ShippingCompanyName],
            Q.[ShippingCity],
            Q.[ShippingState],
            Q.[ShippingCountry],
            Q.[ShippingAddress],
            Q.[ShippingPincode],
            Q.[ShippingEmailAddress],
            -- Financial Details
            Q.[BasicAmount],
            Q.[Discount],
            Q.[Total],
            Q.[SGST],
            Q.[CGST],
            Q.[IGST],
            Q.[Tax],
            Q.[RoundOff],
            Q.[GrandTotal],
            Q.[FinalAmount],
            Q.[Currency],
            Q.[IsDomestic],
            Q.[Notes],
            Q.[Terms],
            Q.[TaxFormat],
            -- User Details
            AssignedUser.[Name] AS [LeadAssignedTo],
            AssignedUser.[Contact] AS [UserContact],
            AssignedUser.[Email] AS [UserEmail],
            OrderByUser.[Name] AS [OrderBy],
			Q.[OrderBy] AS [OrderById]
        FROM [dbo].[Orders] Q
            INNER JOIN [dbo].[Leads] L
                ON Q.[LeadId] = L.[LeadId]
            LEFT JOIN [dbo].[Users] AssignedUser
                ON L.[AssignedTo] = AssignedUser.[UserId]
            INNER JOIN [dbo].[Users] OrderByUser
                ON Q.[OrderBy] = OrderByUser.[UserId]
        WHERE Q.[OrderId] = @OrderId;
        
        -- Product Details
        SELECT 
			QPM.[ProductId],
            QPM.[ProductName],
            QPM.[HSNCode],
            QPM.[Quantity],
            QPM.[Rate],
            QPM.[BasicAmount],
            QPM.[Discount],
            QPM.[Tax],
            QPM.[TotalAmount],
            QPM.[ItemDescription]
        FROM [dbo].[OrderProductsMapping] QPM
        WHERE QPM.[OrderId] = @OrderId
          AND QPM.[IsActive] = 1
        ORDER BY QPM.[CreatedOn];
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Order details retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Failed to retrieve quotation details' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetOrdersByUserIdAndMonth]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetOrdersByUserIdAndMonth]
    @UserId UNIQUEIDENTIFIER,
    @Month INT,
    @Year INT,
    @LimitParameter INT = 50,
    @OffsetParameter INT = 0
AS
BEGIN
    BEGIN TRY

        -- Get paginated data
        SELECT 
            O.[OrderId],
            O.[SystemGeneratedId],
            O.[OrderDate],
            U.[Name] AS [UserName],
            L.[Name] AS [LeadName],
            L.[Contact] AS [LeadContact],
            L.[City],
            L.[State],
            L.[Country],
            LS.[Name] AS [LeadSourceName],
            O.[BasicAmount],
            O.[FinalAmount],
            O.[GrandTotal],
            O.[IsDomestic],
            CASE 
                WHEN O.[IsDomestic] = 1 THEN 'Domestic'
                ELSE 'International'
            END AS [OrderType]
        FROM [dbo].[Orders] O
        INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId]
        INNER JOIN [dbo].[Users] U ON O.[OrderBy] = U.[UserId]
        LEFT JOIN [dbo].[LeadSource] LS ON L.[LeadSource] = LS.[LeadSourceId]
        WHERE L.[AssignedTo] = @UserId
          AND MONTH(O.[OrderDate]) = @Month
          AND YEAR(O.[OrderDate]) = @Year
          AND O.[IsActive] = 1
        ORDER BY O.[OrderDate] DESC, O.[CreatedOn] DESC
        OFFSET @OffsetParameter ROWS
        FETCH NEXT @LimitParameter ROWS ONLY;

		SELECT COUNT(*) AS [Total Count]
			FROM [dbo].[Orders] O
			INNER JOIN [dbo].[Leads] L ON O.[LeadId] = L.[LeadId]
			INNER JOIN [dbo].[Users] U ON O.[OrderBy] = U.[UserId]
			LEFT JOIN [dbo].[LeadSource] LS ON L.[LeadSource] = LS.[LeadSourceId]
        WHERE L.[AssignedTo] = @UserId
          AND MONTH(O.[OrderDate]) = @Month
          AND YEAR(O.[OrderDate]) = @Year
          AND O.[IsActive] = 1;

        SELECT 1 AS Success, 'Orders fetched successfully' AS Message;
    END TRY
    BEGIN CATCH
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPDFById]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 5. Get Order by OrderId (View/Download)
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetPDFById]
    @Id UNIQUEIDENTIFIER,
    @Type NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        
        BEGIN TRANSACTION;
        
        IF @Type = 'quotation'
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM [dbo].[Quotations] WHERE [QuotationId] = @Id AND [IsActive] = 1)
            BEGIN
                SELECT 0 AS Success, 'Quotation Data not found' AS Message;
                ROLLBACK TRANSACTION;
                RETURN;
            END
            ELSE
            BEGIN
                -- Quotation Header Details
                SELECT 
                    Q.[LeadId],
                    Q.[SystemGeneratedId],
                    Q.[QuotationDate],
                    DATEADD(DAY, Q.[ExpectedDispatchDays], Q.[QuotationDate]) AS [ExpectedDispatchDate],
                    Q.[ExpectedDispatchDays],
                    Q.[PaymentTerms],
                    -- Billing Details
                    L.[Name] AS [BillingCompanyName],
                    L.[City] AS [BillingCity],
                    L.[Contact] AS [ContactNumber],
                    L.[Email] AS [BillingEmail],
                    L.[GSTNumber],
                    L.[State] AS [BillingState],
                    L.[Country] AS [BillingCountry],
                    L.[Address] AS [BillingAddress],
                    L.[Pincode] AS [BillingPincode],
                    -- Shipping Details
                    Q.[ShippingCompanyName],
                    Q.[ShippingCity],
                    Q.[ShippingState],
                    Q.[ShippingCountry],
                    Q.[ShippingAddress],
                    Q.[ShippingPincode],
                    Q.[ShippingEmailAddress],
                    -- Financial Details
                    Q.[BasicAmount],
                    Q.[Discount],
                    Q.[Total],
                    Q.[SGST],
                    Q.[CGST],
                    Q.[IGST],
                    Q.[Tax],
                    Q.[RoundOff],
                    Q.[GrandTotal],
                    Q.[FinalAmount],
                    Q.[Currency],
                    Q.[IsDomestic],
                    Q.[Notes],
                    Q.[Terms],
                    Q.[TaxFormat],
                    -- User Details
                    AssignedUser.[Name] AS [LeadAssignedTo],
                    AssignedUser.[Contact] AS [UserContact],
                    AssignedUser.[Email] AS [UserEmail],
                    QuotationByUser.[Name] AS [QuotationBy],
                    Q.[QuotationBy] AS [QuotationById]
                FROM [dbo].[Quotations] Q
                    INNER JOIN [dbo].[Leads] L
                        ON Q.[LeadId] = L.[LeadId]
                    LEFT JOIN [dbo].[Users] AssignedUser
                        ON L.[AssignedTo] = AssignedUser.[UserId]
                    INNER JOIN [dbo].[Users] QuotationByUser
                        ON Q.[QuotationBy] = QuotationByUser.[UserId]
                WHERE Q.[QuotationId] = @Id;
            
                DECLARE @BasicAmount DECIMAL(18,2);
                DECLARE @Discount DECIMAL(18,2);

                SELECT 
                    @BasicAmount = BasicAmount,
                    @Discount = Discount
                FROM [dbo].[Quotations]
                WHERE [QuotationId] = @Id
                  AND [IsActive] = 1;

                -- Calculate NetAmount
                DECLARE @NetAmount DECIMAL(18,2) = @BasicAmount - ((@BasicAmount * @Discount) / 100);

                -- Product Details
                SELECT 
                    QPM.[ProductId],
                    QPM.[ProductName],
                    QPM.[HSNCode],
                    QPM.[Quantity],
                    QPM.[Rate],
                    QPM.[BasicAmount] AS [BasicAmount],
                    QPM.[Discount],
                    QPM.[Tax],
                    QPM.[TotalAmount],
                    QPM.[ItemDescription]
                FROM [dbo].[QuotationProductsMapping] QPM
                WHERE QPM.[QuotationId] = @Id
                  AND QPM.[IsActive] = 1
                ORDER BY QPM.[CreatedOn];
            
                COMMIT TRANSACTION;
                SELECT 1 AS Success, 'Download PDF Success.' AS Message;
            END
        END

        ELSE IF @Type = 'performaInvoice'
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE [OrderId] = @Id AND [IsActive] = 1)
            BEGIN
                SELECT 0 AS Success, 'Order not found' AS Message;
                ROLLBACK TRANSACTION;
                RETURN;
            END
            ELSE
            BEGIN
                -- Order Header Details
                SELECT 
                    Q.[LeadId],
                    Q.[SystemGeneratedId],
                    Q.[OrderDate] AS [QuotationDate],
                    DATEADD(DAY, Q.[ExpectedDispatchDays], Q.[OrderDate]) AS [ExpectedDispatchDate],
                    Q.[ExpectedDispatchDays],
                    Q.[PaymentTerms],
                    -- Billing Details
                    L.[Name] AS [BillingCompanyName],
                    L.[City] AS [BillingCity],
                    L.[Contact] AS [ContactNumber],
                    L.[Email] AS [BillingEmail],
                    L.[GSTNumber],
                    L.[State] AS [BillingState],
                    L.[Country] AS [BillingCountry],
                    L.[Address] AS [BillingAddress],
                    L.[Pincode] AS [BillingPincode],
                    -- Shipping Details
                    Q.[ShippingCompanyName],
                    Q.[ShippingCity],
                    Q.[ShippingState],
                    Q.[ShippingCountry],
                    Q.[ShippingAddress],
                    Q.[ShippingPincode],
                    Q.[ShippingEmailAddress],
                    -- Financial Details
                    Q.[BasicAmount],
                    Q.[Discount],
                    Q.[Total],
                    Q.[SGST],
                    Q.[CGST],
                    Q.[IGST],
                    Q.[Tax],
                    Q.[RoundOff],
                    Q.[GrandTotal],
                    Q.[FinalAmount],
                    Q.[Currency],
                    Q.[IsDomestic],
                    Q.[Notes],
                    Q.[Terms],
                    Q.[TaxFormat],
                    -- User Details
                    AssignedUser.[Name] AS [LeadAssignedTo],
                    AssignedUser.[Contact] AS [UserContact],
                    AssignedUser.[Email] AS [UserEmail],
                    OrderByUser.[Name] AS [QuotationBy],
                    Q.[OrderBy] AS [QuotationById]
                FROM [dbo].[Orders] Q
                    INNER JOIN [dbo].[Leads] L
                        ON Q.[LeadId] = L.[LeadId]
                    LEFT JOIN [dbo].[Users] AssignedUser
                        ON L.[AssignedTo] = AssignedUser.[UserId]
                    INNER JOIN [dbo].[Users] OrderByUser
                        ON Q.[OrderBy] = OrderByUser.[UserId]
                WHERE Q.[OrderId] = @Id;
            
                DECLARE @BasicAmount1 DECIMAL(18,2);
                DECLARE @Discount1 DECIMAL(18,2);

                SELECT 
                    @BasicAmount1 = BasicAmount,
                    @Discount1 = Discount
                FROM [dbo].[Orders]
                WHERE [OrderId] = @Id
                  AND [IsActive] = 1;

                -- Calculate NetAmount
                DECLARE @NetAmount1 DECIMAL(18,2) = @BasicAmount1 - ((@BasicAmount1 * @Discount1) / 100);

                -- Product Details
                SELECT 
                    QPM.[ProductId],
                    QPM.[ProductName],
                    QPM.[HSNCode],
                    QPM.[Quantity],
                    QPM.[Rate],
                    QPM.[BasicAmount] AS [BasicAmount],
                    QPM.[Discount],
                    QPM.[Tax],
                    QPM.[TotalAmount],
                    QPM.[ItemDescription]
                FROM [dbo].[OrderProductsMapping] QPM
                WHERE QPM.[OrderId] = @Id
                  AND QPM.[IsActive] = 1
                ORDER BY QPM.[CreatedOn];

                COMMIT TRANSACTION;
                SELECT 1 AS Success, 'Download PDF Success.' AS Message;
            END
        END

        ELSE
        BEGIN
            SELECT 0 AS Success, 'Invalid Type. Use quotation or performaInvoice.' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPermissionNames]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   OR ALTER PROCEDURE [dbo].[sp_GetPermissionNames]
AS
BEGIN 
	SELECT [PermissionId],
			[Name]
	FROM [dbo].[Permissions]; 
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPermissions]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
GO
/****** Object:  StoredProcedure [dbo].[sp_GetQuotation]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetQuotation]
    @SearchParameter NVARCHAR(100) = NULL,
    @LimitParameter INT = 25,
    @OffsetParameter INT = 0,
    @IsDomestic BIT = NULL,
    @AssignedTo UNIQUEIDENTIFIER = NULL,
    @UserId UNIQUEIDENTIFIER  -- Added parameter for current user
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        -- Main query with conditional filtering based on user type
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all quotations
            SELECT 
                Q.[QuotationId],
                Q.[SystemGeneratedId],
                QuotationByUser.[Name] AS [QuotationCreatedBy],
                L.[Name] AS [LeadName],
                L.[Contact],
                Q.[CreatedOn] AS [LeadCreatedOnDate],
                CONCAT(L.[City], ' - ', L.[State]) AS [CityState],
                STRING_AGG(QPM.[ProductName], ', ') AS [Products],
                Q.[BasicAmount],
                Q.[FinalAmount],
                Q.[IsDomestic]
            FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[Users] QuotationByUser
                    ON Q.[QuotationBy] = QuotationByUser.[UserId]
                INNER JOIN [dbo].[LeadType] LT
                    ON L.[LeadType] = LT.[LeadTypeId]
                LEFT JOIN [dbo].[QuotationProductsMapping] QPM
                    ON Q.[QuotationId] = QPM.[QuotationId]
                    AND QPM.[IsActive] = 1
            WHERE 
                Q.[IsActive] = 1
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo)
            GROUP BY 
                Q.[SystemGeneratedId], 
                QuotationByUser.[Name], 
                L.[Name], 
                Q.[CreatedOn],
                L.[City], 
                L.[State], 
                Q.[BasicAmount], 
                Q.[FinalAmount], 
                LT.[Name], 
                Q.[QuotationId], 
                Q.[IsDomestic], 
                L.[Contact]
            ORDER BY Q.[CreatedOn] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(DISTINCT Q.[QuotationId]) AS 'TotalCount'
            FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
            WHERE 
                Q.[IsActive] = 1
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo);
        END
        ELSE
        BEGIN
            -- Regular user sees only quotations for leads assigned to them
            SELECT 
                Q.[QuotationId],
                Q.[SystemGeneratedId],
                QuotationByUser.[Name] AS [QuotationCreatedBy],
                L.[Name] AS [LeadName],
                L.[Contact],
                Q.[CreatedOn] AS [LeadCreatedOnDate],
                CONCAT(L.[City], ' - ', L.[State]) AS [CityState],
                STRING_AGG(QPM.[ProductName], ', ') AS [Products],
                Q.[BasicAmount],
                Q.[FinalAmount],
                Q.[IsDomestic]
            FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
                INNER JOIN [dbo].[Users] QuotationByUser
                    ON Q.[QuotationBy] = QuotationByUser.[UserId]
                INNER JOIN [dbo].[LeadType] LT
                    ON L.[LeadType] = LT.[LeadTypeId]
                LEFT JOIN [dbo].[QuotationProductsMapping] QPM
                    ON Q.[QuotationId] = QPM.[QuotationId]
                    AND QPM.[IsActive] = 1
            WHERE 
                Q.[IsActive] = 1
                AND L.[AssignedTo] = @UserId  -- Filter by user's assigned leads
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo)
            GROUP BY 
                Q.[SystemGeneratedId], 
                QuotationByUser.[Name], 
                L.[Name], 
                Q.[CreatedOn],
                L.[City], 
                L.[State], 
                Q.[BasicAmount], 
                Q.[FinalAmount], 
                LT.[Name], 
                Q.[QuotationId], 
                Q.[IsDomestic], 
                L.[Contact]
            ORDER BY Q.[CreatedOn] DESC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(DISTINCT Q.[QuotationId]) AS 'TotalCount'
            FROM [dbo].[Quotations] Q
                INNER JOIN [dbo].[Leads] L
                    ON Q.[LeadId] = L.[LeadId]
            WHERE 
                Q.[IsActive] = 1
                AND L.[AssignedTo] = @UserId  -- Filter by user's assigned leads
                AND (
                    @SearchParameter IS NULL 
                    OR LTRIM(RTRIM(@SearchParameter)) = '' 
                    OR L.[Name] LIKE '%' + @SearchParameter + '%'
                    OR L.[Address] LIKE '%' + @SearchParameter + '%'
                    OR L.[City] LIKE '%' + @SearchParameter + '%'
                    OR L.[State] LIKE '%' + @SearchParameter + '%'
                    OR L.[Contact] LIKE '%' + @SearchParameter + '%'
                )
                AND (@IsDomestic IS NULL OR Q.[IsDomestic] = @IsDomestic)
                AND (@AssignedTo IS NULL OR L.[AssignedTo] = @AssignedTo);
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Quotations retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_GetQuotationByQuotationId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- 5. Get Quotation by QuotationId (View/Download)
CREATE       OR ALTER PROCEDURE [dbo].[sp_GetQuotationByQuotationId]
    @QuotationId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Quotations] WHERE [QuotationId] = @QuotationId AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Quotation not found' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Quotation Header Details
        SELECT 
			Q.[LeadId],
            Q.[SystemGeneratedId],
            Q.[QuotationDate],
            DATEADD(DAY, Q.[ExpectedDispatchDays], Q.[QuotationDate]) AS [ExpectedDispatchDate],
			Q.[ExpectedDispatchDays],
            Q.[PaymentTerms],
            -- Billing Details
            L.[Name] AS [BillingCompanyName],
            L.[City] AS [BillingCity],
            L.[Contact] AS [ContactNumber],
            L.[Email] AS [BillingEmail],
            L.[GSTNumber],
            L.[State] AS [BillingState],
            L.[Country] AS [BillingCountry],
            L.[Address] AS [BillingAddress],
            L.[Pincode] AS [BillingPincode],
            -- Shipping Details
            Q.[ShippingCompanyName],
            Q.[ShippingCity],
            Q.[ShippingState],
            Q.[ShippingCountry],
            Q.[ShippingAddress],
            Q.[ShippingPincode],
            Q.[ShippingEmailAddress],
            -- Financial Details
            Q.[BasicAmount],
            Q.[Discount],
            Q.[Total],
            Q.[SGST],
            Q.[CGST],
            Q.[IGST],
            Q.[Tax],
            Q.[RoundOff],
            Q.[GrandTotal],
            Q.[FinalAmount],
            Q.[Currency],
            Q.[IsDomestic],
            Q.[Notes],
            Q.[Terms],
            Q.[TaxFormat],
            -- User Details
            AssignedUser.[Name] AS [LeadAssignedTo],
            AssignedUser.[Contact] AS [UserContact],
            AssignedUser.[Email] AS [UserEmail],
            QuotationByUser.[Name] AS [QuotationBy],
			Q.[QuotationBy] AS [QuotationById]
        FROM [dbo].[Quotations] Q
            INNER JOIN [dbo].[Leads] L
                ON Q.[LeadId] = L.[LeadId]
            LEFT JOIN [dbo].[Users] AssignedUser
                ON L.[AssignedTo] = AssignedUser.[UserId]
            INNER JOIN [dbo].[Users] QuotationByUser
                ON Q.[QuotationBy] = QuotationByUser.[UserId]
        WHERE Q.[QuotationId] = @QuotationId;
        
        -- Product Details
        SELECT 
			QPM.[ProductId],
            QPM.[ProductName],
            QPM.[HSNCode],
            QPM.[Quantity],
            QPM.[Rate],
            QPM.[BasicAmount],
            QPM.[Discount],
            QPM.[Tax],
            QPM.[TotalAmount],
            QPM.[ItemDescription]
        FROM [dbo].[QuotationProductsMapping] QPM
        WHERE QPM.[QuotationId] = @QuotationId
          AND QPM.[IsActive] = 1
        ORDER BY QPM.[CreatedOn];
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Quotation details retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Failed to retrieve quotation details' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetRefreshToken]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[sp_GetRefreshToken]
@Token NVARCHAR(500)
AS
BEGIN
  SELECT RefreshTokens.[Id],
		RefreshTokens.[UserId],
		RefreshTokens.[Token],
		RefreshTokens.[ExpiryDate],
		Users.[Email], 
		Users.[UserTypeId]
  FROM [dbo].[RefreshTokens]
  INNER JOIN [dbo].[Users] 
  ON RefreshTokens.[UserId] = Users.[UserId]
  WHERE RefreshTokens.[Token] = @Token;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GetTargetByUserId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetTargetByUserId]
    @UserId UNIQUEIDENTIFIER,
	@OffsetParameter INT = 0,
	@LimitParameter INT = 50
AS
BEGIN
    BEGIN TRY
        SELECT 
			U.[UserId],
			U.[Name],
            DATENAME(MONTH, DATEFROMPARTS(T.[Year], T.[Month], 1)) + '-' + CAST(T.[Year] AS VARCHAR(4)) AS [MonthYear],
            T.[Month],
            T.[Year],
            T.[TotalTarget] AS [Target],
            ISNULL((SELECT SUM(GrandTotal) 
                    FROM [dbo].[Orders] 
                    WHERE OrderBy = T.[UserID] 
                      AND MONTH([OrderDate]) = T.[Month]
                      AND YEAR([OrderDate]) = T.[Year]), 0) AS [Collection],
            CASE 
                WHEN T.[TotalTarget] > 0 THEN 
                    ROUND(ISNULL((SELECT SUM(GrandTotal) 
                                  FROM [dbo].[Orders] 
                                  WHERE OrderBy = T.[UserID] 
                                    AND MONTH([OrderDate]) = T.[Month]
                                    AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget], 2)
                ELSE 0
            END AS [Average],
            T.[TargetID]
        FROM [dbo].[Targets] T
			INNER JOIN [dbo].[Users] U
				ON T.[UserID]	= U.[UserId]
        WHERE T.[UserID] = @UserId
        ORDER BY T.[Year] DESC, T.[Month] DESC

		OFFSET @OffsetParameter ROWS
        FETCH NEXT @LimitParameter ROWS ONLY;

		SELECT COUNT(*)  AS 'Total Count'
			FROM [dbo].[Targets] T
        WHERE T.[UserID] = @UserId;

        SELECT 1 AS Success, 'Targets fetched successfully' AS Message;
    END TRY
    BEGIN CATCH
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTargets]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetTargets]
	@UserId UNIQUEIDENTIFIER,
	@LimitParameter INT = 50,
	@OffsetParameter INT = 0
AS
BEGIN
	BEGIN TRY
		DECLARE @IsAdmin BIT;
		
		-- Check if user is admin
		SELECT @IsAdmin = UT.[IsAdmin] 
		FROM [dbo].[Users] U 
		INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
		WHERE U.[UserId] = @UserId;
				
		-- Return target data based on admin status
		IF @IsAdmin = 1
		BEGIN
			-- Admin sees all targets
			SELECT T.[TargetID],
				T.[UserID],
				U.[Name],
				T.[TotalTarget],
				U.[Contact],
				ISNULL((SELECT SUM(GrandTotal) 
				 FROM [dbo].[Orders] 
				 WHERE OrderBy = T.[UserID]
				   AND MONTH([OrderDate]) = T.[Month]
				   AND YEAR([OrderDate]) = T.[Year]), 0) AS [TotalCollection],
				CASE 
					WHEN T.[TotalTarget] > 0 THEN 
						ROUND(ISNULL((SELECT SUM(GrandTotal) 
						       FROM [dbo].[Orders] 
						       WHERE OrderBy = T.[UserID]
						         AND MONTH([OrderDate]) = T.[Month]
						         AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget], 2)
					ELSE 0
				END AS [PerformancePercentage],
				CASE 
					WHEN T.[TotalTarget] = 0 THEN 'No Target'
					WHEN ISNULL((SELECT SUM(GrandTotal) 
					      FROM [dbo].[Orders] 
					      WHERE OrderBy = T.[UserID]
					        AND MONTH([OrderDate]) = T.[Month]
					        AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget] >= 100 THEN 'Achieved'
					WHEN ISNULL((SELECT SUM(GrandTotal) 
					      FROM [dbo].[Orders] 
					      WHERE OrderBy = T.[UserID]
					        AND MONTH([OrderDate]) = T.[Month]
					        AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget] >= 15 THEN 'On Track'
					ELSE 'Below Target'
				END AS [Status]
			FROM [dbo].[Targets] T
			INNER JOIN [dbo].[Users] U
				ON T.[UserID] = U.[UserId]
			WHERE T.[Month] = MONTH(GETDATE())
			  AND T.[Year] = YEAR(GETDATE())
			ORDER BY U.[Name] ASC
			OFFSET @OffsetParameter ROWS
			FETCH NEXT @LimitParameter ROWS ONLY;
		END
		ELSE 
		BEGIN
			-- Non-admin sees only their own target
			SELECT T.[TargetID],
				T.[UserID],
				U.[Name],
				U.[ProfileImagePath],
				T.[TotalTarget],
				ISNULL((SELECT SUM(GrandTotal) 
				 FROM [dbo].[Orders] 
				 WHERE OrderBy = T.[UserID]
				   AND MONTH([OrderDate]) = T.[Month]
				   AND YEAR([OrderDate]) = T.[Year]), 0) AS [TotalCollection],
				CASE 
					WHEN T.[TotalTarget] > 0 THEN 
						ROUND(ISNULL((SELECT SUM(GrandTotal) 
						       FROM [dbo].[Orders] 
						       WHERE OrderBy = T.[UserID]
						         AND MONTH([OrderDate]) = T.[Month]
						         AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget], 2)
					ELSE 0
				END AS [PerformancePercentage],
				CASE 
					WHEN T.[TotalTarget] = 0 THEN 'No Target'
					WHEN ISNULL((SELECT SUM(GrandTotal) 
					      FROM [dbo].[Orders] 
					      WHERE OrderBy = T.[UserID]
					        AND MONTH([OrderDate]) = T.[Month]
					        AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget] >= 100 THEN 'Achieved'
					WHEN ISNULL((SELECT SUM(GrandTotal) 
					      FROM [dbo].[Orders] 
					      WHERE OrderBy = T.[UserID]
					        AND MONTH([OrderDate]) = T.[Month]
					        AND YEAR([OrderDate]) = T.[Year]), 0) * 100.0 / T.[TotalTarget] >= 15 THEN 'On Track'
					ELSE 'Below Target'
				END AS [Status]
			FROM [dbo].[Targets] T
			INNER JOIN [dbo].[Users] U
				ON T.[UserID] = U.[UserId]
			WHERE T.[Month] = MONTH(GETDATE())
			  AND T.[Year] = YEAR(GETDATE())
			  AND T.[UserID] = @UserId
			ORDER BY U.[Name] ASC
			OFFSET @OffsetParameter ROWS
			FETCH NEXT @LimitParameter ROWS ONLY;
		END
		

				-- Return total count based on admin status
		IF @IsAdmin = 1
		BEGIN
			-- Admin sees all targets count
			SELECT COUNT(*) AS [TotalCount]
			FROM [dbo].[Targets] T
			WHERE T.[Month] = MONTH(GETDATE())
			  AND T.[Year] = YEAR(GETDATE());
		END
		ELSE
		BEGIN
			-- Non-admin sees only their target count
			SELECT COUNT(*) AS [TotalCount]
			FROM [dbo].[Targets] T
			WHERE T.[Month] = MONTH(GETDATE())
			  AND T.[Year] = YEAR(GETDATE())
			  AND T.[UserID] = @UserId;
		END

		
		SELECT 1 AS Success, 'Targets fetched successfully' AS Message;
	END TRY
	BEGIN CATCH
		SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUnAssignedLeadByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUnAssignedLeadByLeadId]
    @LeadId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        SELECT 
            Leads.[Name] AS [LeadName],
            Leads.[Contact] AS [LeadPhoneNumber],
            Leads.[State] AS [LeadAddress],
            LeadType.[Name] AS [LeadType],
            LeadSource.[Name] AS [LeadSource],
            LeadStatus.[Name] AS [Status]
        FROM [dbo].[Leads]	
            INNER JOIN [dbo].[LeadStatus]
                ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
            INNER JOIN [dbo].[LeadType]
                ON Leads.[LeadType] = LeadType.[LeadTypeId]
            INNER JOIN [dbo].[LeadSource]
                ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
        WHERE Leads.[LeadId] = @LeadId 
          AND Leads.[IsDeleted] = 0;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Data retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, 'Data retrieval failed' AS Message;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUnAssignedLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE         OR ALTER PROCEDURE [dbo].[sp_GetUnAssignedLeads]
    @SearchParameter NVARCHAR(100) = NULL,
    @LimitParameter INT,
    @OffsetParameter INT,
    @StatusParam UNIQUEIDENTIFIER = NULL,
    @LeadTypeId UNIQUEIDENTIFIER = NULL,
	@SourceParameter UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Main query with filters applied dynamically
    SELECT 
        Leads.[LeadId], 
        Leads.[Name],
        Leads.[Contact],
        Leads.[State],
        FollowUps.[LastFollowUpDate] AS [LastFollowUpDate],
        STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
        Leads.[AssignedTo],
        Leads.[LeadSource] AS [LeadSourceId],
        LeadSource.[Name] AS [LeadSource],
        Leads.[LeadStatus] AS [LeadStatusId],
        LeadStatus.[Name] AS [Status],
        Leads.[LeadType] AS [LeadTypeId],
        LeadType.[Name] AS [LeadType]
    FROM [dbo].[Leads]
        INNER JOIN [dbo].[LeadProductsMapping]
            ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
        INNER JOIN [dbo].[LeadSource]
            ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
        INNER JOIN [dbo].[LeadType]
            ON Leads.[LeadType] = LeadType.[LeadTypeId]
        INNER JOIN [dbo].[LeadStatus]
            ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
		LEFT JOIN [dbo].[FollowUps]
			ON Leads.[LeadId] = FollowUps.[Lead]
    WHERE 
        Leads.[IsDeleted] = 0 
		AND
		LeadSource.[IsActive] = 1
		AND 
		LeadSource.[IsDeleted] = 0
		AND
		LeadType.[IsActive] = 1
		AND
		LeadType.[IsDeleted] = 0
		AND
		LeadStatus.[IsActive] = 1
		AND
		LeadStatus.[IsDeleted] = 0
 		AND
		Leads.[AssignedTo] IS NULL
        -- Search filter (only if search param provided)
        AND (
            @SearchParameter IS NULL 
            OR LTRIM(RTRIM(@SearchParameter)) = '' 
            OR Leads.[Name] LIKE '%' + @SearchParameter + '%'
            OR Leads.[Contact] LIKE '%' + @SearchParameter + '%'
        )
        -- Status filter (only if provided)
        AND (
            @StatusParam IS NULL
            OR Leads.[LeadStatus] = @StatusParam
        )
        -- LeadType filter (only if provided)
        AND (
            @LeadTypeId IS NULL
            OR Leads.[LeadType] = @LeadTypeId
        )
		-- Source filter (only if provided)
		AND (
            @SourceParameter IS NULL
            OR Leads.[LeadSource] = @SourceParameter
        )
    GROUP BY 
        Leads.[LeadId], 
        Leads.[Name],
        Leads.[Contact],
        Leads.[State],
        Leads.[AssignedTo],
        Leads.[LeadSource], LeadSource.[Name],
        Leads.[LeadStatus], LeadStatus.[Name],
        Leads.[LeadType], LeadType.[Name],
		Leads.[CreatedOn],
		FollowUps.[LastFollowUpDate]
    ORDER BY Leads.[CreatedOn], Leads.[Name]
    OFFSET @OffsetParameter ROWS
    FETCH NEXT @LimitParameter ROWS ONLY;
    
    -- Count query (with same filters)
    SELECT COUNT(DISTINCT Leads.[LeadId]) AS 'Total Count'
    FROM [dbo].[Leads]
        INNER JOIN [dbo].[LeadProductsMapping]
            ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
        INNER JOIN [dbo].[LeadSource]
            ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
        INNER JOIN [dbo].[LeadType]
            ON Leads.[LeadType] = LeadType.[LeadTypeId]
        INNER JOIN [dbo].[LeadStatus]
            ON Leads.[LeadStatus] = LeadStatus.[LeadStatusId]
		LEFT JOIN [dbo].[FollowUps]
			ON Leads.[LeadId] = FollowUps.[Lead]
    WHERE 
        Leads.[IsDeleted] = 0
		AND
		LeadSource.[IsActive] = 1
		AND 
		LeadSource.[IsDeleted] = 0
		AND
		LeadType.[IsActive] = 1
		AND
		LeadType.[IsDeleted] = 0
		AND
		LeadStatus.[IsActive] = 1
		AND
		LeadStatus.[IsDeleted] = 0
 		AND
		Leads.[AssignedTo] IS NULL
        AND (
            @SearchParameter IS NULL 
            OR LTRIM(RTRIM(@SearchParameter)) = '' 
            OR Leads.[Name] LIKE '%' + @SearchParameter + '%'
            OR Leads.[Contact] LIKE '%' + @SearchParameter + '%'
        )
        AND (
            @StatusParam IS NULL
            OR Leads.[LeadStatus] = @StatusParam
        )
        AND (
            @LeadTypeId IS NULL
            OR Leads.[LeadType] = @LeadTypeId
        )
		-- Source filter (only if provided)
		AND (
            @SourceParameter IS NULL
            OR Leads.[LeadSource] = @SourceParameter
        );
        
        COMMIT TRANSACTION;

		SELECT 1 AS Success, 'Data retrieved successfully' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

		SELECT 0 AS Success, 'No Data found' AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUpcomingFollowups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUpcomingFollowups]
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if user is admin (non-regular user)
        DECLARE @IsAdmin BIT = 0;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            -- Admin sees all upcoming follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for admin
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE);
        END
        ELSE
        BEGIN
            -- Regular user sees only their assigned leads' upcoming follow-ups
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId  -- Filter by user's assigned leads
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            -- Count query for regular user
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId;
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Upcoming followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUpcomingFollowups_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUpcomingFollowups_v1]
	@SearchParameter NVARCHAR(100),
    @LimitParameter INT,
    @OffsetParameter INT,
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @IsAdmin BIT = 0;
        DECLARE @CleanedSearch NVARCHAR(100);
        
        SET @CleanedSearch = LTRIM(RTRIM(@SearchParameter));
        IF @CleanedSearch = '' OR @CleanedSearch IS NULL
            SET @CleanedSearch = NULL;
        
        SELECT @IsAdmin = UT.[IsAdmin]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT ON U.[UserTypeId] = UT.[UserTypeId] 
        WHERE U.[UserId] = @UserId 
            AND UT.[IsRegularUser] = 0;
        
        IF @IsAdmin = 1
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        ELSE
        BEGIN
            SELECT 
                FollowUps.[FollowUpId],
                Leads.[LeadId],
                Leads.[Name] AS [LeadName],
                LeadType.[Name] AS [LeadType],
                Leads.[Contact],
                Leads.[State],
                CAST(FollowUps.[LastFollowUpDate] AS DATE) AS [LastFollowUpDate],
                CAST(FollowUps.[NextFollowUpDate] AS DATE) AS [NextFollowUpDate],
                FollowUps.[Comments],
                STRING_AGG(LeadProductsMapping.[ProductName], ', ') AS [Products],
                Users.[Name] AS [AssignedUser],
                LeadSource.[Name] AS [LeadSource],
                FollowupStatusTable.[Name] AS [FollowupStatus]
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                INNER JOIN [dbo].[LeadType]
                    ON Leads.[LeadType] = LeadType.[LeadTypeId]
                INNER JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
                LEFT JOIN [dbo].[LeadProductsMapping]
                    ON Leads.[LeadId] = LeadProductsMapping.[LeadId]
                    AND LeadProductsMapping.[IsActive] = 1
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                )
            GROUP BY 
                FollowUps.[FollowUpId], Leads.[Name], LeadType.[Name], Leads.[Contact], Leads.[State],
                FollowUps.[LastFollowUpDate], FollowUps.[NextFollowUpDate], FollowUps.[Comments],
                Users.[Name], LeadSource.[Name], FollowupStatusTable.[Name], Leads.[LeadId]
            ORDER BY FollowUps.[NextFollowUpDate] ASC
            OFFSET @OffsetParameter ROWS
            FETCH NEXT @LimitParameter ROWS ONLY;
            
            SELECT COUNT(*) AS 'Total Count'
            FROM [dbo].[FollowUps]
                INNER JOIN [dbo].[Leads]
                    ON FollowUps.[Lead] = Leads.[LeadId]
                LEFT JOIN [dbo].[LeadSource]
                    ON Leads.[LeadSource] = LeadSource.[LeadSourceId]
                LEFT JOIN [dbo].[LeadStatus] AS FollowupStatusTable
                    ON FollowUps.[FollowupStatus] = FollowupStatusTable.[LeadStatusId]
                LEFT JOIN [dbo].[Users]
                    ON Leads.[AssignedTo] = Users.[UserId]
            WHERE 
                FollowUps.[IsActive] = 1
                AND Leads.[IsDeleted] = 0
                AND FollowUps.[NextFollowUpDate] >= CAST(GETDATE() AS DATE)
                AND Leads.[AssignedTo] = @UserId
                AND (
                    @CleanedSearch IS NULL
                    OR Leads.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[Contact] LIKE '%' + @CleanedSearch + '%'
                    OR Leads.[State] LIKE '%' + @CleanedSearch + '%'
                    OR CAST(FollowUps.[LastFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR CAST(FollowUps.[NextFollowUpDate] AS DATE) = TRY_CONVERT(DATE, @CleanedSearch)
                    OR Users.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR LeadSource.[Name] LIKE '%' + @CleanedSearch + '%'
                    OR FollowupStatusTable.[Name] LIKE '%' + @CleanedSearch + '%'
                );
        END
        
        COMMIT TRANSACTION;
        SELECT 1 AS Success, 'Upcoming followups retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserByUserId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUserByUserId]
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
/****** Object:  StoredProcedure [dbo].[sp_GetUsers]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUsers]
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
/****** Object:  StoredProcedure [dbo].[sp_GetUsersForAdminDDNLeads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUsersForAdminDDNLeads]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            U.[UserId],
            U.[Name]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT
            ON U.[UserTypeId] = UT.[UserTypeId]
        WHERE U.[IsActive] = 1
		AND
		UT.[IsAdmin] = 0
		AND
		UT.[IsRegularUser] = 1
        ORDER BY U.[Name];
        
        SELECT 1 AS Success, 'Admin users retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUsersForTarget]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUsersForTarget]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            U.[UserId],
            U.[Name],
            ISNULL(T.[TotalTarget], 0) AS [TotalTarget],
            MONTH(GETDATE()) AS [CurrentMonth],
            DATENAME(MONTH, GETDATE()) AS [CurrentMonthName],
            YEAR(GETDATE()) AS [CurrentYear]
        FROM [dbo].[Users] U
        INNER JOIN [dbo].[UserType] UT
            ON U.[UserTypeId] = UT.[UserTypeId]
        LEFT JOIN [dbo].[Targets] T
            ON U.[UserId] = T.[UserID]
               AND T.[Month] = MONTH(GETDATE())
               AND T.[Year] = YEAR(GETDATE())
        WHERE U.[IsActive] = 1
            AND UT.[IsAdmin] = 0
            AND UT.[IsRegularUser] = 1
        ORDER BY U.[Name];
        
        SELECT 1 AS Success, 'Users retrieved successfully' AS Message;
        
    END TRY
    BEGIN CATCH
        SELECT 
            0 AS Success, 
            ERROR_MESSAGE() AS Message,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserTypeByUserTypeId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUserTypeByUserTypeId]
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
/****** Object:  StoredProcedure [dbo].[sp_GetUserTypeByUserTypeId_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     OR ALTER PROCEDURE [dbo].[sp_GetUserTypeByUserTypeId_v1]
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
		SELECT (SELECT UTDP.[HasAccess] FROM [dbo].[UserTypeDashboardsPermissionsControl] UTDP JOIN [dbo].[DashboardsPermissions] DP ON UTDP.[DashboardsPermissionId] = DP.[DashboardsPermissionId] WHERE DP.[Name] = 'Leads' AND UTDP.[UserTypeId] = @UserTypeId) AS 'Leads Card',  
			(SELECT UTDP.[HasAccess] FROM [dbo].[UserTypeDashboardsPermissionsControl] UTDP JOIN [dbo].[DashboardsPermissions] DP ON UTDP.[DashboardsPermissionId] = DP.[DashboardsPermissionId] WHERE DP.[Name] = 'Followups' AND UTDP.[UserTypeId] = @UserTypeId) AS 'Followups Card',
			(SELECT UTDP.[HasAccess] FROM [dbo].[UserTypeDashboardsPermissionsControl] UTDP JOIN [dbo].[DashboardsPermissions] DP ON UTDP.[DashboardsPermissionId] = DP.[DashboardsPermissionId] WHERE DP.[Name] = 'Targets' AND UTDP.[UserTypeId] = @UserTypeId) AS 'Targets Card',
			(SELECT UTDP.[HasAccess] FROM [dbo].[UserTypeDashboardsPermissionsControl] UTDP JOIN [dbo].[DashboardsPermissions] DP ON UTDP.[DashboardsPermissionId] = DP.[DashboardsPermissionId] WHERE DP.[Name] = 'Quotations' AND UTDP.[UserTypeId] = @UserTypeId) AS 'Quotations Card',
			(SELECT UTDP.[HasAccess] FROM [dbo].[UserTypeDashboardsPermissionsControl] UTDP JOIN [dbo].[DashboardsPermissions] DP ON UTDP.[DashboardsPermissionId] = DP.[DashboardsPermissionId] WHERE DP.[Name] = 'Orders' AND UTDP.[UserTypeId] = @UserTypeId) AS 'Orders Card';


		SELECT 1 AS Success, 'Data Request Successful' AS Message;

	END

	ELSE
	BEGIN
		SELECT 0 AS Success, 'Unauthorized Access Found' AS Message;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserTypeNames]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserTypeNames]
AS
BEGIN
	SELECT [UserTypeId], [Name] FROM [dbo].[UserType]; 
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserTypes]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   OR ALTER PROCEDURE [dbo].[sp_GetUserTypes]
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateLeadByLeadId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE      OR ALTER PROCEDURE [dbo].[sp_UpdateLeadByLeadId]
@LeadId UNIQUEIDENTIFIER,
@Name NVARCHAR(100),
@Contact NVARCHAR(100),
@City NVARCHAR(100),
@State NVARCHAR(100),
@LeadType UNIQUEIDENTIFIER,
@LeadStatus UNIQUEIDENTIFIER,
@LeadSource UNIQUEIDENTIFIER,
@AssignedTo UNIQUEIDENTIFIER NULL,
@ModifiedBy UNIQUEIDENTIFIER,
@GSTNumber NVARCHAR(100),
@Email NVARCHAR(100),
@Country NVARCHAR(100),
@Address NVARCHAR(100),
@Pincode NVARCHAR(100),

-- Product mapping parameters (JSON or structured format)
@ProductMappings NVARCHAR(MAX) = NULL  -- JSON: [{"ProductId":1,"ProductName":"Product A","Quantity":5}]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Name
        IF @Name IS NULL OR LTRIM(RTRIM(@Name)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid name' AS Message;
            RETURN;
        END
        
        -- Validate Contact uniqueness (exclude current lead)
        ELSE IF EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [Contact] = @Contact 
              AND [LeadId] <> @LeadId
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Contact already exists for another lead' AS Message;
            RETURN;
        END
        
        -- Validate Contact
        ELSE IF @Contact IS NULL OR LTRIM(RTRIM(@Contact)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid contact' AS Message;
            RETURN;
        END
        
        -- Validate City
        ELSE IF @City IS NULL OR LTRIM(RTRIM(@City)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid city' AS Message;
            RETURN;
        END
        
        -- Validate State
        ELSE IF @State IS NULL OR LTRIM(RTRIM(@State)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid state' AS Message;
            RETURN;
        END
        
        -- Validate LeadSource exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadSource] 
            WHERE [LeadSourceId] = @LeadSource 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead source' AS Message;
            RETURN;
        END
        
        -- Validate LeadType exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadType] 
            WHERE [LeadTypeId] = @LeadType 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead type' AS Message;
            RETURN;
        END
        
        -- Validate LeadStatus exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadStatus] 
            WHERE [LeadStatusId] = @LeadStatus 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead status' AS Message;
            RETURN;
        END
        
        -- Validate AssignedTo user exists (only if not NULL)
        ELSE IF @AssignedTo IS NOT NULL AND NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Users] 
            WHERE [UserId] = @AssignedTo 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid assigned user' AS Message;
            RETURN;
        END
        
        -- Validate Lead exists and is not deleted
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or already deleted' AS Message;
            RETURN;
        END
        
        ELSE
        BEGIN
            BEGIN TRANSACTION;
            
            -- Update the lead
            UPDATE [dbo].[Leads]
            SET [Name] = @Name,
                [Contact] = @Contact,
                [City] = @City,
                [State] = @State,
                [LeadType] = @LeadType,
                [LeadStatus] = @LeadStatus,
                [LeadSource] = @LeadSource,
                [AssignedTo] = @AssignedTo,
                [ModifiedBy] = @ModifiedBy,
				[GSTNumber] = @GSTNumber,
				[Email] = @Email,
				[Country] = @Country,
				[Address] = @Address,
				[Pincode] = @Pincode,
                [ModifiedOn] = GETDATE()
            WHERE [LeadId] = @LeadId
              AND [IsDeleted] = 0;
            
            -- Verify the lead update was successful
            IF @@ROWCOUNT = 0
            BEGIN
                ROLLBACK TRANSACTION;
                SELECT 0 AS Success, 'Failed to update lead' AS Message;
                RETURN;
            END
            
            -- Handle product mappings update if provided
            IF @ProductMappings IS NOT NULL
            BEGIN
                -- Create temp table for new product mappings
                SELECT 
                    CAST(JSON_VALUE(value, '$.ProductId') AS INT) AS ProductId,
                    JSON_VALUE(value, '$.ProductName') AS ProductName,
                    CAST(JSON_VALUE(value, '$.Quantity') AS INT) AS Quantity
                INTO #NewProducts
                FROM OPENJSON(@ProductMappings);
                
                -- Mark existing products as inactive if they're not in the new list
                UPDATE [dbo].[LeadProductsMapping]
                SET [IsActive] = 0,
                    [ModifiedBy] = @ModifiedBy,
                    [ModifiedOn] = GETDATE()
                WHERE [LeadId] = @LeadId
                  AND [ProductId] NOT IN (SELECT ProductId FROM #NewProducts)
                  AND [IsActive] = 1;
                
                -- Process each new product
                DECLARE @ProductId INT, @ProductName NVARCHAR(MAX), @Quantity INT;
                
                DECLARE product_cursor CURSOR FOR
                SELECT ProductId, ProductName, Quantity FROM #NewProducts;
                
                OPEN product_cursor;
                FETCH NEXT FROM product_cursor INTO @ProductId, @ProductName, @Quantity;
                
                WHILE @@FETCH_STATUS = 0
                BEGIN
                    -- Check if product already exists for this lead
                   IF EXISTS (
					SELECT 1 
					FROM [dbo].[LeadProductsMapping] 
					WHERE [LeadId] = @LeadId 
					  AND (
						  ([ProductId] = @ProductId) 
						  OR ([ProductId] IS NULL AND @ProductId IS NULL AND [ProductName] = @ProductName)
					  )
				)
                    BEGIN
                        -- Update existing product mapping
                        UPDATE [dbo].[LeadProductsMapping]
                        SET [ProductName] = @ProductName,
							[ProductId] = @ProductId,
                            [Quantity] = @Quantity,
                            [IsActive] = 1,
                            [ModifiedBy] = @ModifiedBy,
                            [ModifiedOn] = GETDATE()
                        WHERE [LeadId] = @LeadId 
                          AND [ProductId] = @ProductId;
                    END
                    ELSE
                    BEGIN
                        -- Insert new product mapping
                        INSERT INTO [dbo].[LeadProductsMapping]
                            ([LeadId], [ProductId], [ProductName], [Quantity], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
                        VALUES
                            (@LeadId, @ProductId, @ProductName, @Quantity, 1, @ModifiedBy, GETDATE(), @ModifiedBy, GETDATE());
                    END
                    
                    FETCH NEXT FROM product_cursor INTO @ProductId, @ProductName, @Quantity;
                END
                
                CLOSE product_cursor;
                DEALLOCATE product_cursor;
                
                -- Cleanup temp table
                DROP TABLE #NewProducts;
            END
            
            COMMIT TRANSACTION;
            
            SELECT 1 AS Success, 'Lead and products updated successfully' AS Message;
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateLeadByLeadId_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateLeadByLeadId_v1]
@LeadId UNIQUEIDENTIFIER,
@Name NVARCHAR(100),
@Contact NVARCHAR(100),
@City NVARCHAR(100),
@State NVARCHAR(100),
@LeadType UNIQUEIDENTIFIER,
@LeadStatus UNIQUEIDENTIFIER,
@LeadSource UNIQUEIDENTIFIER,
@AssignedTo UNIQUEIDENTIFIER NULL,
@ModifiedBy UNIQUEIDENTIFIER,
@GSTNumber NVARCHAR(100),
@Email NVARCHAR(100),
@Country NVARCHAR(100),
@Address NVARCHAR(100),
@Pincode NVARCHAR(100),

-- Product mapping parameters (JSON or structured format)
@ProductMappings NVARCHAR(MAX) = NULL  -- JSON: [{"ProductId":1,"ProductName":"Product A","Quantity":5}]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Name
        IF @Name IS NULL OR LTRIM(RTRIM(@Name)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid name' AS Message;
            RETURN;
        END
        
        -- Validate Contact uniqueness (exclude current lead)
        ELSE IF EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [Contact] = @Contact 
              AND [LeadId] <> @LeadId
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Contact already exists for another lead' AS Message;
            RETURN;
        END
        
        -- Validate Contact
        ELSE IF @Contact IS NULL OR LTRIM(RTRIM(@Contact)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid contact' AS Message;
            RETURN;
        END
        
        -- Validate City
        ELSE IF @City IS NULL OR LTRIM(RTRIM(@City)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid city' AS Message;
            RETURN;
        END
        
        -- Validate State
        ELSE IF @State IS NULL OR LTRIM(RTRIM(@State)) = ''
        BEGIN
            SELECT 0 AS Success, 'Enter valid state' AS Message;
            RETURN;
        END
        
        -- Validate LeadSource exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadSource] 
            WHERE [LeadSourceId] = @LeadSource 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead source' AS Message;
            RETURN;
        END
        
        -- Validate LeadType exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadType] 
            WHERE [LeadTypeId] = @LeadType 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead type' AS Message;
            RETURN;
        END
        
        -- Validate LeadStatus exists
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[LeadStatus] 
            WHERE [LeadStatusId] = @LeadStatus 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid Lead status' AS Message;
            RETURN;
        END
        
        -- Validate AssignedTo user exists (only if not NULL)
        ELSE IF @AssignedTo IS NOT NULL AND NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Users] 
            WHERE [UserId] = @AssignedTo 
              AND [IsActive] = 1
        )
        BEGIN
            SELECT 0 AS Success, 'Select valid assigned user' AS Message;
            RETURN;
        END
        
        -- Validate Lead exists and is not deleted
        ELSE IF NOT EXISTS (
            SELECT 1 
            FROM [dbo].[Leads] 
            WHERE [LeadId] = @LeadId 
              AND [IsDeleted] = 0
        )
        BEGIN
            SELECT 0 AS Success, 'Lead not found or already deleted' AS Message;
            RETURN;
        END
        
        ELSE
        BEGIN
            BEGIN TRANSACTION;
            
            -- Update the lead
            UPDATE [dbo].[Leads]
            SET [Name] = @Name,
                [Contact] = @Contact,
                [City] = @City,
                [State] = @State,
                [LeadType] = @LeadType,
                [LeadStatus] = @LeadStatus,
                [LeadSource] = @LeadSource,
                [AssignedTo] = @AssignedTo,
                [ModifiedBy] = @ModifiedBy,
                [GSTNumber] = @GSTNumber,
                [Email] = @Email,
                [Country] = @Country,
                [Address] = @Address,
                [Pincode] = @Pincode,
                [ModifiedOn] = GETDATE()
            WHERE [LeadId] = @LeadId
              AND [IsDeleted] = 0;
            
            -- Verify the lead update was successful
            IF @@ROWCOUNT = 0
            BEGIN
                ROLLBACK TRANSACTION;
                SELECT 0 AS Success, 'Failed to update lead' AS Message;
                RETURN;
            END
            
            -- Handle product mappings update if provided
            IF @ProductMappings IS NOT NULL
            BEGIN
                -- Create temp table for new product mappings
                SELECT 
                    CAST(JSON_VALUE(value, '$.ProductId') AS INT) AS ProductId,
                    JSON_VALUE(value, '$.ProductName') AS ProductName,
                    CAST(JSON_VALUE(value, '$.Quantity') AS INT) AS Quantity
                INTO #NewProducts
                FROM OPENJSON(@ProductMappings);
                
                -- Mark ALL existing products as inactive first (including IndiaMart products)
                UPDATE [dbo].[LeadProductsMapping]
                SET [IsActive] = 0,
                    [ModifiedBy] = @ModifiedBy,
                    [ModifiedOn] = GETDATE()
                WHERE [LeadId] = @LeadId
                  AND [IsActive] = 1;
                
                -- Process each new product
                DECLARE @ProductId INT, @ProductName NVARCHAR(MAX), @Quantity INT;
                DECLARE @MappingId UNIQUEIDENTIFIER;
                
                DECLARE product_cursor CURSOR FOR
                SELECT ProductId, ProductName, Quantity FROM #NewProducts;
                
                OPEN product_cursor;
                FETCH NEXT FROM product_cursor INTO @ProductId, @ProductName, @Quantity;
                
                WHILE @@FETCH_STATUS = 0
                BEGIN
                    SET @MappingId = NULL;
                    
                    -- Try to find existing mapping to reactivate/update
                    -- First try exact ProductId match (for real products)
                    IF @ProductId IS NOT NULL
                    BEGIN
                        SELECT TOP 1 @MappingId = MappingId
                        FROM [dbo].[LeadProductsMapping]
                        WHERE [LeadId] = @LeadId
                          AND [ProductId] = @ProductId;
                    END
                    ELSE
                    BEGIN
                        -- For IndiaMart products (NULL ProductId), try to match by ProductName
                        SELECT TOP 1 @MappingId = MappingId
                        FROM [dbo].[LeadProductsMapping]
                        WHERE [LeadId] = @LeadId
                          AND [ProductId] IS NULL
                          AND [ProductName] = @ProductName;
                    END
                    
                    -- If found, reactivate and update it
                    IF @MappingId IS NOT NULL
                    BEGIN
                        UPDATE [dbo].[LeadProductsMapping]
                        SET [ProductName] = @ProductName,
                            [ProductId] = @ProductId,
                            [Quantity] = @Quantity,
                            [IsActive] = 1,
                            [ModifiedBy] = @ModifiedBy,
                            [ModifiedOn] = GETDATE()
                        WHERE [MappingId] = @MappingId;
                    END
                    ELSE
                    BEGIN
                        -- Insert new product mapping
                        INSERT INTO [dbo].[LeadProductsMapping]
                            ([LeadId], [ProductId], [ProductName], [Quantity], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn])
                        VALUES
                            (@LeadId, @ProductId, @ProductName, @Quantity, 1, @ModifiedBy, GETDATE(), @ModifiedBy, GETDATE());
                    END
                    
                    FETCH NEXT FROM product_cursor INTO @ProductId, @ProductName, @Quantity;
                END
                
                CLOSE product_cursor;
                DEALLOCATE product_cursor;
                
                -- Cleanup temp table
                DROP TABLE #NewProducts;
            END
            
            COMMIT TRANSACTION;
            
            SELECT 1 AS Success, 'Lead and products updated successfully' AS Message;
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateLeadSource]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateLeadSource]
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateLeadStatus]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateLeadStatus]
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateLeadType]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateLeadType]
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateOrderByOrderId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Update Order with Products (Smart Update) - FIXED VERSION
CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateOrderByOrderId]
    @OrderId UNIQUEIDENTIFIER,
    @OrderBy UNIQUEIDENTIFIER,
    @OrderDate DATE,
    @ShippingCompanyName NVARCHAR(200) = NULL,
    @ShippingEmailAddress NVARCHAR(200) = NULL,
    @ShippingAddress NVARCHAR(MAX) = NULL,
    @ShippingCity NVARCHAR(100) = NULL,
    @ShippingState NVARCHAR(100) = NULL,
    @ShippingPincode NVARCHAR(20) = NULL,
    @ShippingCountry NVARCHAR(100) = NULL,
    @IsDomestic BIT,
    @Currency NVARCHAR(3),
    @ExpectedDispatchDays INT = NULL,
    @PaymentTerms NVARCHAR(100) = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @Terms NVARCHAR(100) = NULL,
    @TaxFormat NVARCHAR(100) = NULL,
    @BasicAmount DECIMAL(18,2),
    @Discount DECIMAL(18,2) = 0,
    @Total DECIMAL(18,2),
    @SGST DECIMAL(18,2) = 0,
    @CGST DECIMAL(18,2) = 0,
    @IGST DECIMAL(18,2) = 0,
    @Tax DECIMAL(18,2) = 0,
    @RoundOff DECIMAL(18,2) = 0,
    @GrandTotal DECIMAL(18,2),
    @FinalAmount DECIMAL(18,2),
    @ModifiedBy UNIQUEIDENTIFIER,
    @ProductMappings NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Order exists and is active
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE [OrderId] = @OrderId AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Order not found or inactive' AS Message;
            RETURN;
        END
        
        -- Validate OrderBy user exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @OrderBy AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Invalid user for OrderBy' AS Message;
            RETURN;
        END
        
        -- Validate ModifiedBy user exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @ModifiedBy AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Invalid user for ModifiedBy' AS Message;
            RETURN;
        END
        
        -- Validate amounts
        IF @BasicAmount <= 0 OR @GrandTotal <= 0 OR @FinalAmount <= 0
        BEGIN
            SELECT 0 AS Success, 'Invalid amount values' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Update Order Header
        UPDATE [dbo].[Orders]
        SET 
            [OrderBy] = @OrderBy,
            [OrderDate] = @OrderDate,
            [ShippingCompanyName] = @ShippingCompanyName,
            [ShippingEmailAddress] = @ShippingEmailAddress,
            [ShippingAddress] = @ShippingAddress,
            [ShippingCity] = @ShippingCity,
            [ShippingState] = @ShippingState,
            [ShippingPincode] = @ShippingPincode,
            [ShippingCountry] = @ShippingCountry,
            [IsDomestic] = @IsDomestic,
            [Currency] = @Currency,
            [ExpectedDispatchDays] = @ExpectedDispatchDays,
            [PaymentTerms] = @PaymentTerms,
            [Notes] = @Notes,
            [Terms] = @Terms,
            [TaxFormat] = @TaxFormat,
            [BasicAmount] = @BasicAmount,
            [Discount] = @Discount,
            [Total] = @Total,
            [SGST] = @SGST,
            [CGST] = @CGST,
            [IGST] = @IGST,
            [Tax] = @Tax,
            [RoundOff] = @RoundOff,
            [GrandTotal] = @GrandTotal,
            [FinalAmount] = @FinalAmount,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [OrderId] = @OrderId;
        
        -- Handle Product Mappings if provided
        IF @ProductMappings IS NOT NULL AND LTRIM(RTRIM(@ProductMappings)) != ''
        BEGIN
            -- Create temp table to hold incoming products
            CREATE TABLE #IncomingProducts (
                MappingId UNIQUEIDENTIFIER,
                ProductId INT,
                ProductName NVARCHAR(200),
                HSNCode NVARCHAR(50),
                Quantity INT,
                Rate DECIMAL(18,2),
                BasicAmount DECIMAL(18,2),
                Discount DECIMAL(18,2),
                Tax DECIMAL(18,2),
                TotalAmount DECIMAL(18,2),
                ItemDescription NVARCHAR(MAX)
            );
            
            -- Parse JSON and insert into temp table
            INSERT INTO #IncomingProducts
            SELECT 
                CASE 
                    WHEN JSON_VALUE(value, '$.MappingId') IS NULL OR JSON_VALUE(value, '$.MappingId') = '' 
                    THEN NULL 
                    ELSE CAST(JSON_VALUE(value, '$.MappingId') AS UNIQUEIDENTIFIER)
                END,
                CAST(JSON_VALUE(value, '$.ProductId') AS INT),
                JSON_VALUE(value, '$.ProductName'),
                JSON_VALUE(value, '$.HSNCode'),
                CAST(JSON_VALUE(value, '$.Quantity') AS INT),
                CAST(JSON_VALUE(value, '$.Rate') AS DECIMAL(18,2)),
                CAST(JSON_VALUE(value, '$.BasicAmount') AS DECIMAL(18,2)),
                ISNULL(CAST(JSON_VALUE(value, '$.Discount') AS DECIMAL(18,2)), 0),
                ISNULL(CAST(JSON_VALUE(value, '$.Tax') AS DECIMAL(18,2)), 0),
                CAST(JSON_VALUE(value, '$.TotalAmount') AS DECIMAL(18,2)),
                JSON_VALUE(value, '$.ItemDescription')
            FROM OPENJSON(@ProductMappings);
            
            -- CASE 1: Soft delete products that exist in DB but NOT in incoming list
            UPDATE QPM
            SET 
                QPM.[IsActive] = 0,
                QPM.[ModifiedBy] = @ModifiedBy,
                QPM.[ModifiedOn] = GETDATE()
            FROM [dbo].[OrderProductsMapping] QPM
            WHERE 
                QPM.[OrderId] = @OrderId
                AND QPM.[IsActive] = 1
                AND NOT EXISTS (
                    SELECT 1 
                    FROM #IncomingProducts IP 
                    WHERE IP.MappingId = QPM.MappingId
                );
            
            -- CASE 2: Update existing products that have changes
            UPDATE QPM
            SET 
                QPM.[ProductId] = IP.ProductId,
                QPM.[ProductName] = IP.ProductName,
                QPM.[HSNCode] = IP.HSNCode,
                QPM.[Quantity] = IP.Quantity,
                QPM.[Rate] = IP.Rate,
                QPM.[QuotedPrice] = IP.Rate,
                QPM.[BasicAmount] = IP.BasicAmount,
                QPM.[Discount] = IP.Discount,
                QPM.[Tax] = IP.Tax,
                QPM.[TotalAmount] = IP.TotalAmount,
                QPM.[ItemDescription] = IP.ItemDescription,
                QPM.[ModifiedBy] = @ModifiedBy,
                QPM.[ModifiedOn] = GETDATE()
            FROM [dbo].[OrderProductsMapping] QPM
            INNER JOIN #IncomingProducts IP
                ON QPM.MappingId = IP.MappingId
            WHERE 
                QPM.[OrderId] = @OrderId
                AND QPM.[IsActive] = 1
                AND (
                    QPM.[ProductId] != IP.ProductId
                    OR QPM.[ProductName] != IP.ProductName
                    OR ISNULL(QPM.[HSNCode], '') != ISNULL(IP.HSNCode, '')
                    OR QPM.[Quantity] != IP.Quantity
                    OR QPM.[Rate] != IP.Rate
                    OR QPM.[BasicAmount] != IP.BasicAmount
                    OR QPM.[Discount] != IP.Discount
                    OR QPM.[Tax] != IP.Tax
                    OR QPM.[TotalAmount] != IP.TotalAmount
                    OR ISNULL(QPM.[ItemDescription], '') != ISNULL(IP.ItemDescription, '')
                );
            
            -- CASE 3A: Reactivate soft-deleted products that are being re-added
            UPDATE QPM
            SET 
                QPM.[IsActive] = 1,
                QPM.[ProductName] = IP.ProductName,
                QPM.[HSNCode] = IP.HSNCode,
                QPM.[Quantity] = IP.Quantity,
                QPM.[Rate] = IP.Rate,
                QPM.[QuotedPrice] = IP.Rate,
                QPM.[BasicAmount] = IP.BasicAmount,
                QPM.[Discount] = IP.Discount,
                QPM.[Tax] = IP.Tax,
                QPM.[TotalAmount] = IP.TotalAmount,
                QPM.[ItemDescription] = IP.ItemDescription,
                QPM.[ModifiedBy] = @ModifiedBy,
                QPM.[ModifiedOn] = GETDATE()
            FROM [dbo].[OrderProductsMapping] QPM
            INNER JOIN #IncomingProducts IP
                ON QPM.[OrderId] = @OrderId 
                AND QPM.[ProductId] = IP.ProductId
            WHERE 
                QPM.[IsActive] = 0
                AND IP.MappingId IS NULL;
            
            -- CASE 3B: Insert only truly new products (that don't exist at all)
            INSERT INTO [dbo].[OrderProductsMapping]
                ([OrderId], [ProductId], [ProductName], [HSNCode], [Quantity], [Rate],
                 [BasicAmount], [Discount], [Tax], [TotalAmount], [ItemDescription], [QuotedPrice],
                 [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
            SELECT 
                @OrderId,
                IP.ProductId,
                IP.ProductName,
                IP.HSNCode,
                IP.Quantity,
                IP.Rate,
                IP.BasicAmount,
                IP.Discount,
                IP.Tax,
                IP.TotalAmount,
                IP.ItemDescription,
                IP.Rate,
                1,
                GETDATE(),
                @ModifiedBy,
                GETDATE(),
                @ModifiedBy
            FROM #IncomingProducts IP
            WHERE 
                IP.MappingId IS NULL
                AND NOT EXISTS (
                    SELECT 1 
                    FROM [dbo].[OrderProductsMapping] QPM 
                    WHERE QPM.[OrderId] = @OrderId
                    AND QPM.[ProductId] = IP.ProductId
                );
            
            DROP TABLE #IncomingProducts;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Order updated successfully' AS Message, @OrderId AS OrderId;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message, NULL AS OrderId;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdatePassword]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdatePassword]
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
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateProfileImage]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateProfileImage]
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateQuotationByQuotationId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Update Quotation with Products (Smart Update) - FIXED VERSION
CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateQuotationByQuotationId]
    @QuotationId UNIQUEIDENTIFIER,
    @QuotationBy UNIQUEIDENTIFIER,
    @QuotationDate DATE,
    @ShippingCompanyName NVARCHAR(200) = NULL,
    @ShippingEmailAddress NVARCHAR(200) = NULL,
    @ShippingAddress NVARCHAR(MAX) = NULL,
    @ShippingCity NVARCHAR(100) = NULL,
    @ShippingState NVARCHAR(100) = NULL,
    @ShippingPincode NVARCHAR(20) = NULL,
    @ShippingCountry NVARCHAR(100) = NULL,
    @IsDomestic BIT,
    @Currency NVARCHAR(3),
    @ExpectedDispatchDays INT = NULL,
    @PaymentTerms NVARCHAR(100) = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @Terms NVARCHAR(100) = NULL,
    @TaxFormat NVARCHAR(100) = NULL,
    @BasicAmount DECIMAL(18,2),
    @Discount DECIMAL(18,2) = 0,
    @Total DECIMAL(18,2),
    @SGST DECIMAL(18,2) = 0,
    @CGST DECIMAL(18,2) = 0,
    @IGST DECIMAL(18,2) = 0,
    @Tax DECIMAL(18,2) = 0,
    @RoundOff DECIMAL(18,2) = 0,
    @GrandTotal DECIMAL(18,2),
    @FinalAmount DECIMAL(18,2),
    @ModifiedBy UNIQUEIDENTIFIER,
    @ProductMappings NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validate Quotation exists and is active
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Quotations] WHERE [QuotationId] = @QuotationId AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Quotation not found or inactive' AS Message;
            RETURN;
        END
        
        -- Validate QuotationBy user exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @QuotationBy AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Invalid user for QuotationBy' AS Message;
            RETURN;
        END
        
        -- Validate ModifiedBy user exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [UserId] = @ModifiedBy AND [IsActive] = 1)
        BEGIN
            SELECT 0 AS Success, 'Invalid user for ModifiedBy' AS Message;
            RETURN;
        END
        
        -- Validate amounts
        IF @BasicAmount <= 0 OR @GrandTotal <= 0 OR @FinalAmount <= 0
        BEGIN
            SELECT 0 AS Success, 'Invalid amount values' AS Message;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Update Quotation Header
        UPDATE [dbo].[Quotations]
        SET 
            [QuotationBy] = @QuotationBy,
            [QuotationDate] = @QuotationDate,
            [ShippingCompanyName] = @ShippingCompanyName,
            [ShippingEmailAddress] = @ShippingEmailAddress,
            [ShippingAddress] = @ShippingAddress,
            [ShippingCity] = @ShippingCity,
            [ShippingState] = @ShippingState,
            [ShippingPincode] = @ShippingPincode,
            [ShippingCountry] = @ShippingCountry,
            [IsDomestic] = @IsDomestic,
            [Currency] = @Currency,
            [ExpectedDispatchDays] = @ExpectedDispatchDays,
            [PaymentTerms] = @PaymentTerms,
            [Notes] = @Notes,
            [Terms] = @Terms,
            [TaxFormat] = @TaxFormat,
            [BasicAmount] = @BasicAmount,
            [Discount] = @Discount,
            [Total] = @Total,
            [SGST] = @SGST,
            [CGST] = @CGST,
            [IGST] = @IGST,
            [Tax] = @Tax,
            [RoundOff] = @RoundOff,
            [GrandTotal] = @GrandTotal,
            [FinalAmount] = @FinalAmount,
            [ModifiedBy] = @ModifiedBy,
            [ModifiedOn] = GETDATE()
        WHERE [QuotationId] = @QuotationId;
        
        -- Handle Product Mappings if provided
        IF @ProductMappings IS NOT NULL AND LTRIM(RTRIM(@ProductMappings)) != ''
        BEGIN
            -- Create temp table to hold incoming products
            CREATE TABLE #IncomingProducts (
                MappingId UNIQUEIDENTIFIER,
                ProductId INT,
                ProductName NVARCHAR(200),
                HSNCode NVARCHAR(50),
                Quantity INT,
                Rate DECIMAL(18,2),
                BasicAmount DECIMAL(18,2),
                Discount DECIMAL(18,2),
                Tax DECIMAL(18,2),
                TotalAmount DECIMAL(18,2),
                ItemDescription NVARCHAR(MAX)
            );
            
            -- Parse JSON and insert into temp table
            INSERT INTO #IncomingProducts
            SELECT 
                CASE 
                    WHEN JSON_VALUE(value, '$.MappingId') IS NULL OR JSON_VALUE(value, '$.MappingId') = '' 
                    THEN NULL 
                    ELSE CAST(JSON_VALUE(value, '$.MappingId') AS UNIQUEIDENTIFIER)
                END,
                CAST(JSON_VALUE(value, '$.ProductId') AS INT),
                JSON_VALUE(value, '$.ProductName'),
                JSON_VALUE(value, '$.HSNCode'),
                CAST(JSON_VALUE(value, '$.Quantity') AS INT),
                CAST(JSON_VALUE(value, '$.Rate') AS DECIMAL(18,2)),
                CAST(JSON_VALUE(value, '$.BasicAmount') AS DECIMAL(18,2)),
                ISNULL(CAST(JSON_VALUE(value, '$.Discount') AS DECIMAL(18,2)), 0),
                ISNULL(CAST(JSON_VALUE(value, '$.Tax') AS DECIMAL(18,2)), 0),
                CAST(JSON_VALUE(value, '$.TotalAmount') AS DECIMAL(18,2)),
                JSON_VALUE(value, '$.ItemDescription')
            FROM OPENJSON(@ProductMappings);
            
            -- CASE 1: Soft delete products that exist in DB but NOT in incoming list
            UPDATE QPM
            SET 
                QPM.[IsActive] = 0,
                QPM.[ModifiedBy] = @ModifiedBy,
                QPM.[ModifiedOn] = GETDATE()
            FROM [dbo].[QuotationProductsMapping] QPM
            WHERE 
                QPM.[QuotationId] = @QuotationId
                AND QPM.[IsActive] = 1
                AND NOT EXISTS (
                    SELECT 1 
                    FROM #IncomingProducts IP 
                    WHERE IP.MappingId = QPM.MappingId
                );
            
            -- CASE 2: Update existing products that have changes
            UPDATE QPM
            SET 
                QPM.[ProductId] = IP.ProductId,
                QPM.[ProductName] = IP.ProductName,
                QPM.[HSNCode] = IP.HSNCode,
                QPM.[Quantity] = IP.Quantity,
                QPM.[Rate] = IP.Rate,
                QPM.[QuotedPrice] = IP.Rate,
                QPM.[BasicAmount] = IP.BasicAmount,
                QPM.[Discount] = IP.Discount,
                QPM.[Tax] = IP.Tax,
                QPM.[TotalAmount] = IP.TotalAmount,
                QPM.[ItemDescription] = IP.ItemDescription,
                QPM.[ModifiedBy] = @ModifiedBy,
                QPM.[ModifiedOn] = GETDATE()
            FROM [dbo].[QuotationProductsMapping] QPM
            INNER JOIN #IncomingProducts IP
                ON QPM.MappingId = IP.MappingId
            WHERE 
                QPM.[QuotationId] = @QuotationId
                AND QPM.[IsActive] = 1
                AND (
                    QPM.[ProductId] != IP.ProductId
                    OR QPM.[ProductName] != IP.ProductName
                    OR ISNULL(QPM.[HSNCode], '') != ISNULL(IP.HSNCode, '')
                    OR QPM.[Quantity] != IP.Quantity
                    OR QPM.[Rate] != IP.Rate
                    OR QPM.[BasicAmount] != IP.BasicAmount
                    OR QPM.[Discount] != IP.Discount
                    OR QPM.[Tax] != IP.Tax
                    OR QPM.[TotalAmount] != IP.TotalAmount
                    OR ISNULL(QPM.[ItemDescription], '') != ISNULL(IP.ItemDescription, '')
                );
            
            -- CASE 3A: Reactivate soft-deleted products that are being re-added
            UPDATE QPM
            SET 
                QPM.[IsActive] = 1,
                QPM.[ProductName] = IP.ProductName,
                QPM.[HSNCode] = IP.HSNCode,
                QPM.[Quantity] = IP.Quantity,
                QPM.[Rate] = IP.Rate,
                QPM.[QuotedPrice] = IP.Rate,
                QPM.[BasicAmount] = IP.BasicAmount,
                QPM.[Discount] = IP.Discount,
                QPM.[Tax] = IP.Tax,
                QPM.[TotalAmount] = IP.TotalAmount,
                QPM.[ItemDescription] = IP.ItemDescription,
                QPM.[ModifiedBy] = @ModifiedBy,
                QPM.[ModifiedOn] = GETDATE()
            FROM [dbo].[QuotationProductsMapping] QPM
            INNER JOIN #IncomingProducts IP
                ON QPM.[QuotationId] = @QuotationId 
                AND QPM.[ProductId] = IP.ProductId
            WHERE 
                QPM.[IsActive] = 0
                AND IP.MappingId IS NULL;
            
            -- CASE 3B: Insert only truly new products (that don't exist at all)
            INSERT INTO [dbo].[QuotationProductsMapping]
                ([QuotationId], [ProductId], [ProductName], [HSNCode], [Quantity], [Rate],
                 [BasicAmount], [Discount], [Tax], [TotalAmount], [ItemDescription], [QuotedPrice],
                 [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy])
            SELECT 
                @QuotationId,
                IP.ProductId,
                IP.ProductName,
                IP.HSNCode,
                IP.Quantity,
                IP.Rate,
                IP.BasicAmount,
                IP.Discount,
                IP.Tax,
                IP.TotalAmount,
                IP.ItemDescription,
                IP.Rate,
                1,
                GETDATE(),
                @ModifiedBy,
                GETDATE(),
                @ModifiedBy
            FROM #IncomingProducts IP
            WHERE 
                IP.MappingId IS NULL
                AND NOT EXISTS (
                    SELECT 1 
                    FROM [dbo].[QuotationProductsMapping] QPM 
                    WHERE QPM.[QuotationId] = @QuotationId
                    AND QPM.[ProductId] = IP.ProductId
                );
            
            DROP TABLE #IncomingProducts;
        END
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Success, 'Quotation updated successfully' AS Message, @QuotationId AS QuotationId;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message, NULL AS QuotationId;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserByUserID]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   OR ALTER PROCEDURE [dbo].[sp_UpdateUserByUserID]
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserTypeByUserTypeId]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     OR ALTER PROCEDURE [dbo].[sp_UpdateUserTypeByUserTypeId]
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
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Orders');

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
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserTypeByUserTypeId_v1]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE       OR ALTER PROCEDURE [dbo].[sp_UpdateUserTypeByUserTypeId_v1]
@UserTypeId UNIQUEIDENTIFIER,
@UserId UNIQUEIDENTIFIER,

@Name NVARCHAR(100),
@IsAdmin BIT,	
@IsRegularUser BIT,
@ModifiedBy UNIQUEIDENTIFIER,
@IsActive BIT,

--------- DASHBOARD PERMISSIONS DECLARATION ----------
@LeadPermission BIT,
@FollowupPermission BIT,
@QuotationPermission BIT,
@OrdersPermission BIT,
@TargetPermission BIT,

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
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Orders');

				UPDATE [dbo].[UserTypePermissionsControl]
				SET	[ReadAccess] = @ProductReadAccess,				[UpdateAccess] = @ProductUpdateAccess,			[CreateAccess] = @ProductCreateAccess,			[DeleteAccess] = @ProductDeleteAccess
				WHERE [UserTypeId] = @UserTypeId AND [PermissionId] = (SELECT [PermissionId] FROM [dbo].[Permissions] WHERE [Name] = 'Product Management');
				

				---------------------------------------

				UPDATE [dbo].[UserTypeDashboardsPermissionsControl]
				SET [HasAccess] = @LeadPermission
				WHERE [UserTypeID] = @UserTypeId AND [DashboardsPermissionId] = (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE [Name] = 'Leads');

				UPDATE [dbo].[UserTypeDashboardsPermissionsControl]
				SET [HasAccess] = @TargetPermission
				WHERE [UserTypeID] = @UserTypeId AND [DashboardsPermissionId] = (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE [Name] = 'Targets');

				UPDATE [dbo].[UserTypeDashboardsPermissionsControl]
				SET [HasAccess] = @QuotationPermission
				WHERE [UserTypeID] = @UserTypeId AND [DashboardsPermissionId] = (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE [Name] = 'Quotations');

				UPDATE [dbo].[UserTypeDashboardsPermissionsControl]
				SET [HasAccess] = @OrdersPermission
				WHERE [UserTypeID] = @UserTypeId AND [DashboardsPermissionId] = (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE [Name] = 'Orders');

				UPDATE [dbo].[UserTypeDashboardsPermissionsControl]
				SET [HasAccess] = @FollowupPermission
				WHERe [UserTypeID] = @UserTypeId AND [DashboardsPermissionId] = (SELECT [DashboardsPermissionId] FROM [dbo].[DashboardsPermissions] WHERE [Name] = 'Followups')



				
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
/****** Object:  StoredProcedure [dbo].[sp_UserLogin]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   OR ALTER PROCEDURE [dbo].[sp_UserLogin]
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
/****** Object:  Trigger [dbo].[Trg_DashboardsPermissions]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_DashboardsPermissions]
ON [dbo].[DashboardsPermissions]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[DashboardsPermissions]'
DECLARE @TableID INT = '8'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.DashboardsPermissionId = DELETED.DashboardsPermissionId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[DashboardsPermissionId], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[DashboardsPermissionId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[DashboardsPermissionId], 'IconPath', NULL, INSERTED.[IconPath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[DashboardsPermissionId], 'IconBGColor', NULL, INSERTED.[IconBGColor], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[DashboardsPermissionId], 'IconColor', NULL, INSERTED.[IconColor], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.DashboardsPermissionId = DELETED.DashboardsPermissionId)
	BEGIN
		IF UPDATE ([Name])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[DashboardsPermissionId], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[DashboardsPermissionId] = DELETED.[DashboardsPermissionId]
				WHERE ISNULL(INSERTED.[Name], '') <> ISNULL(DELETED.[Name], '')
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[DashboardsPermissionId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[DashboardsPermissionId] = DELETED.[DashboardsPermissionId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([IconPath])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[DashboardsPermissionId], 'IconPath', DELETED.[IconPath], INSERTED.[IconPath], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[DashboardsPermissionId] = DELETED.[DashboardsPermissionId]
				WHERE ISNULL(INSERTED.[IconPath], '') <> ISNULL(DELETED.[IconPath], '')
			END

		IF UPDATE ([IconBGColor])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[DashboardsPermissionId], 'IconBGColor', DELETED.[IconBGColor], INSERTED.[IconBGColor], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[DashboardsPermissionId] = DELETED.[DashboardsPermissionId]
				WHERE ISNULL(INSERTED.[IconBGColor], '') <> ISNULL(DELETED.[IconBGColor], '')
			END

		IF UPDATE ([IconColor])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[DashboardsPermissionId], 'IconColor', DELETED.[IconColor], INSERTED.[IconColor], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[DashboardsPermissionId] = DELETED.[DashboardsPermissionId]
				WHERE ISNULL(INSERTED.[IconColor], '') <> ISNULL(DELETED.[IconColor], '')
			END
	END
END;
GO
ALTER TABLE [dbo].[DashboardsPermissions] ENABLE TRIGGER [Trg_DashboardsPermissions]
GO
/****** Object:  Trigger [dbo].[Trg_Followups]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_Followups]
ON [dbo].[FollowUps]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Followups]'
DECLARE @TableID INT = '9'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.FollowUpId = DELETED.FollowUpId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'Lead', NULL, INSERTED.[Lead], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'LastFollowUpDate', NULL, INSERTED.[LastFollowUpDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'NextfollowUpDate', NULL, INSERTED.[NextFollowUpDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'Comments', NULL, INSERTED.[Comments], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'FollowupStatus', NULL, INSERTED.[FollowupStatus], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[FollowUpId], 'IsDeleted', NULL, INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.FollowUpId = DELETED.FollowUpId)
	BEGIN
		IF UPDATE ([Lead])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'Lead', DELETED.[Lead], INSERTED.[Lead], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[Lead], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[Lead], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([LastFollowUpDate])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'LastFollowUpDate', DELETED.[LastFollowUpDate], INSERTED.[LastFollowUpDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[LastFollowUpDate], '1900-01-01') <> ISNULL(DELETED.[LastFollowUpDate], '1900-01-01')
			END

		IF UPDATE ([NextFollowUpDate])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'NextfollowUpDate', DELETED.[NextFollowUpDate], INSERTED.[NextFollowUpDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[NextFollowUpDate], '1900-01-01') <> ISNULL(DELETED.[NextFollowUpDate], '1900-01-01')
			END

		IF UPDATE ([Comments])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'Comments', DELETED.[Comments], INSERTED.[Comments], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[Comments], '') <> ISNULL(DELETED.[Comments], '')
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([FollowupStatus])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'FollowupStatus', DELETED.[FollowupStatus], INSERTED.[FollowupStatus], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[FollowupStatus], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[FollowupStatus], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([IsDeleted])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[FollowUpId], 'IsDeleted', DELETED.[IsDeleted], INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[FollowUpId] = DELETED.[FollowUpId]
				WHERE ISNULL(INSERTED.[IsDeleted], 0) <> ISNULL(DELETED.[IsDeleted], 0)
			END
	END
END;
GO
ALTER TABLE [dbo].[FollowUps] ENABLE TRIGGER [Trg_Followups]
GO
/****** Object:  Trigger [dbo].[Trg_LeadProductsMapping]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_LeadProductsMapping]
ON [dbo].[LeadProductsMapping]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[LeadProductsMapping]'
DECLARE @TableID INT = '10'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.MappingId = DELETED.MappingId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'LeadId', NULL, INSERTED.[LeadId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ProductId', NULL, INSERTED.[ProductId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Quantity', NULL, INSERTED.[Quantity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ProductName', NULL, INSERTED.[ProductName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.MappingId = DELETED.MappingId)
	BEGIN
		IF UPDATE ([LeadId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'LeadId', DELETED.[LeadId], INSERTED.[LeadId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[LeadId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[LeadId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([ProductId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ProductId', DELETED.[ProductId], INSERTED.[ProductId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ProductId], 0) <> ISNULL(DELETED.[ProductId], 0)
			END

		IF UPDATE ([Quantity])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Quantity', DELETED.[Quantity], INSERTED.[Quantity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Quantity], 0) <> ISNULL(DELETED.[Quantity], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([ProductName])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ProductName', DELETED.[ProductName], INSERTED.[ProductName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ProductName], '') <> ISNULL(DELETED.[ProductName], '')
			END
	END
END;
GO
ALTER TABLE [dbo].[LeadProductsMapping] ENABLE TRIGGER [Trg_LeadProductsMapping]
GO
/****** Object:  Trigger [dbo].[Trg_Leads]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_Leads]
ON [dbo].[Leads]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Leads]'
DECLARE @TableID INT = '11'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.LeadId = DELETED.LeadId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'Name', NULL, INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'Contact', NULL, INSERTED.[Contact], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'City', NULL, INSERTED.[City], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'State', NULL, INSERTED.[State], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'LeadType', NULL, INSERTED.[LeadType], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'LeadSource', NULL, INSERTED.[LeadSource], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'LeadStatus', NULL, INSERTED.[LeadStatus], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'AssignedTo', NULL, INSERTED.[AssignedTo], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'IsDeleted', NULL, INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'GSTNumber', NULL, INSERTED.[GSTNumber], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'Email', NULL, INSERTED.[Email], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'Country', NULL, INSERTED.[Country], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'Address', NULL, INSERTED.[Address], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[LeadId], 'Pincode', NULL, INSERTED.[Pincode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.LeadId = DELETED.LeadId)
	BEGIN
		IF UPDATE ([Name])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'Name', DELETED.[Name], INSERTED.[Name], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[Name], '') <> ISNULL(DELETED.[Name], '')
			END

		IF UPDATE ([Contact])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'Contact', DELETED.[Contact], INSERTED.[Contact], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[Contact], '') <> ISNULL(DELETED.[Contact], '')
			END

		IF UPDATE ([City])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'City', DELETED.[City], INSERTED.[City], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[City], '') <> ISNULL(DELETED.[City], '')
			END

		IF UPDATE ([State])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'State', DELETED.[State], INSERTED.[State], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[State], '') <> ISNULL(DELETED.[State], '')
			END

		IF UPDATE ([LeadType])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'LeadType', DELETED.[LeadType], INSERTED.[LeadType], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[LeadType], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[LeadType], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([LeadSource])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'LeadSource', DELETED.[LeadSource], INSERTED.[LeadSource], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[LeadSource], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[LeadSource], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([LeadStatus])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'LeadStatus', DELETED.[LeadStatus], INSERTED.[LeadStatus], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[LeadStatus], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[LeadStatus], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([AssignedTo])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'AssignedTo', DELETED.[AssignedTo], INSERTED.[AssignedTo], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[AssignedTo], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[AssignedTo], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([IsDeleted])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'IsDeleted', DELETED.[IsDeleted], INSERTED.[IsDeleted], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[IsDeleted], 0) <> ISNULL(DELETED.[IsDeleted], 0)
			END

		IF UPDATE ([GSTNumber])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'GSTNumber', DELETED.[GSTNumber], INSERTED.[GSTNumber], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[GSTNumber], '') <> ISNULL(DELETED.[GSTNumber], '')
			END

		IF UPDATE ([Email])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'Email', DELETED.[Email], INSERTED.[Email], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[Email], '') <> ISNULL(DELETED.[Email], '')
			END

		IF UPDATE ([Country])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'Country', DELETED.[Country], INSERTED.[Country], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[Country], '') <> ISNULL(DELETED.[Country], '')
			END

		IF UPDATE ([Address])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'Address', DELETED.[Address], INSERTED.[Address], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[Address], '') <> ISNULL(DELETED.[Address], '')
			END

		IF UPDATE ([Pincode])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[LeadId], 'Pincode', DELETED.[Pincode], INSERTED.[Pincode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[LeadId] = DELETED.[LeadId]
				WHERE ISNULL(INSERTED.[Pincode], '') <> ISNULL(DELETED.[Pincode], '')
			END
	END
END;
GO
ALTER TABLE [dbo].[Leads] ENABLE TRIGGER [Trg_Leads]
GO
/****** Object:  Trigger [dbo].[Trg_LeadSource]    Script Date: 24-10-2025 10:03:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[Trg_LeadSource]
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
ALTER TABLE [dbo].[LeadSource] ENABLE TRIGGER [Trg_LeadSource]
GO
/****** Object:  Trigger [dbo].[Trg_LeadStatus]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_LeadStatus]
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
ALTER TABLE [dbo].[LeadStatus] ENABLE TRIGGER [Trg_LeadStatus]
GO
/****** Object:  Trigger [dbo].[Trg_LeadType]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_LeadType]
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
ALTER TABLE [dbo].[LeadType] ENABLE TRIGGER [Trg_LeadType]
GO
/****** Object:  Trigger [dbo].[Trg_OrderProductsMapping]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_OrderProductsMapping]
ON [dbo].[OrderProductsMapping]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[OrderProductsMapping]'
DECLARE @TableID INT = '12'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.MappingId = DELETED.MappingId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'OrderId', NULL, INSERTED.[OrderId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ProductId', NULL, INSERTED.[ProductId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Quantity', NULL, INSERTED.[Quantity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'QuoatedPrice', NULL, INSERTED.[QuotedPrice], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ProductName', NULL, INSERTED.[ProductName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'HSNCode', NULL, INSERTED.[HSNCode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Rate', NULL, INSERTED.[Rate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'BasicAmount', NULL, INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Discount', NULL, INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Tax', NULL, INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'TotalAmount', NULL, INSERTED.[TotalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ItemDescription', NULL, INSERTED.[ItemDescription], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.MappingId = DELETED.MappingId)
	BEGIN
		IF UPDATE ([OrderId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'OrderId', DELETED.[OrderId], INSERTED.[OrderId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[OrderId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[OrderId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([ProductId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ProductId', DELETED.[ProductId], INSERTED.[ProductId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ProductId], 0) <> ISNULL(DELETED.[ProductId], 0)
			END

		IF UPDATE ([Quantity])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Quantity', DELETED.[Quantity], INSERTED.[Quantity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Quantity], 0) <> ISNULL(DELETED.[Quantity], 0)
			END

		IF UPDATE ([QuotedPrice])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'QuoatedPrice', DELETED.[QuotedPrice], INSERTED.[QuotedPrice], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[QuotedPrice], 0) <> ISNULL(DELETED.[QuotedPrice], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([ProductName])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ProductName', DELETED.[ProductName], INSERTED.[ProductName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ProductName], '') <> ISNULL(DELETED.[ProductName], '')
			END

		IF UPDATE ([HSNCode])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'HSNCode', DELETED.[HSNCode], INSERTED.[HSNCode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[HSNCode], '') <> ISNULL(DELETED.[HSNCode], '')
			END

		IF UPDATE ([Rate])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Rate', DELETED.[Rate], INSERTED.[Rate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Rate], 0) <> ISNULL(DELETED.[Rate], 0)
			END

		IF UPDATE ([BasicAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'BasicAmount', DELETED.[BasicAmount], INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[BasicAmount], 0) <> ISNULL(DELETED.[BasicAmount], 0)
			END

		IF UPDATE ([Discount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Discount', DELETED.[Discount], INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Discount], 0) <> ISNULL(DELETED.[Discount], 0)
			END

		IF UPDATE ([Tax])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Tax', DELETED.[Tax], INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Tax], 0) <> ISNULL(DELETED.[Tax], 0)
			END

		IF UPDATE ([TotalAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'TotalAmount', DELETED.[TotalAmount], INSERTED.[TotalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[TotalAmount], 0) <> ISNULL(DELETED.[TotalAmount], 0)
			END

		IF UPDATE ([ItemDescription])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ItemDescription', DELETED.[ItemDescription], INSERTED.[ItemDescription], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ItemDescription], '') <> ISNULL(DELETED.[ItemDescription], '')
			END
	END
END;
GO
ALTER TABLE [dbo].[OrderProductsMapping] ENABLE TRIGGER [Trg_OrderProductsMapping]
GO
/****** Object:  Trigger [dbo].[Trg_Orders]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_Orders]
ON [dbo].[Orders]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Orders]'
DECLARE @TableID INT = '13'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.OrderId = DELETED.OrderId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'OrderBy', NULL, INSERTED.[OrderBy], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'LeadId', NULL, INSERTED.[LeadId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingCompanyName', NULL, INSERTED.[ShippingCompanyName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingEmailAddress', NULL, INSERTED.[ShippingEmailAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingAddress', NULL, INSERTED.[ShippingAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingCity', NULL, INSERTED.[ShippingCity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingState', NULL, INSERTED.[ShippingState], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingPincode', NULL, INSERTED.[ShippingPincode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ShippingCountry', NULL, INSERTED.[ShippingCountry], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'BasicAmount', NULL, INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'FinalAmount', NULL, INSERTED.[FinalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'OrderDate', NULL, INSERTED.[OrderDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'IsDomestic', NULL, INSERTED.[IsDomestic], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'Currency', NULL, INSERTED.[Currency], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'ExpectedDispatchDays', NULL, INSERTED.[ExpectedDispatchDays], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'PaymentTerms', NULL, INSERTED.[PaymentTerms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'Notes', NULL, INSERTED.[Notes], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'Terms', NULL, INSERTED.[Terms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'TaxFormat', NULL, INSERTED.[TaxFormat], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'Discount', NULL, INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'Total', NULL, INSERTED.[Total], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'SGST', NULL, INSERTED.[SGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'CGST', NULL, INSERTED.[CGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'IGST', NULL, INSERTED.[IGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'Tax', NULL, INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'RoundOff', NULL, INSERTED.[RoundOff], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[OrderId], 'GrandTotal', NULL, INSERTED.[GrandTotal], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.OrderId = DELETED.OrderId)
	BEGIN
		IF UPDATE ([OrderBy])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'OrderBy', DELETED.[OrderBy], INSERTED.[OrderBy], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[OrderBy], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[OrderBy], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([LeadId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'LeadId', DELETED.[LeadId], INSERTED.[LeadId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[LeadId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[LeadId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([ShippingCompanyName])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingCompanyName', DELETED.[ShippingCompanyName], INSERTED.[ShippingCompanyName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingCompanyName], '') <> ISNULL(DELETED.[ShippingCompanyName], '')
			END

		IF UPDATE ([ShippingEmailAddress])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingEmailAddress', DELETED.[ShippingEmailAddress], INSERTED.[ShippingEmailAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingEmailAddress], '') <> ISNULL(DELETED.[ShippingEmailAddress], '')
			END

		IF UPDATE ([ShippingAddress])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingAddress', DELETED.[ShippingAddress], INSERTED.[ShippingAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingAddress], '') <> ISNULL(DELETED.[ShippingAddress], '')
			END

		IF UPDATE ([ShippingCity])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingCity', DELETED.[ShippingCity], INSERTED.[ShippingCity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingCity], '') <> ISNULL(DELETED.[ShippingCity], '')
			END

		IF UPDATE ([ShippingState])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingState', DELETED.[ShippingState], INSERTED.[ShippingState], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingState], '') <> ISNULL(DELETED.[ShippingState], '')
			END

		IF UPDATE ([ShippingPincode])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingPincode', DELETED.[ShippingPincode], INSERTED.[ShippingPincode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingPincode], '') <> ISNULL(DELETED.[ShippingPincode], '')
			END

		IF UPDATE ([ShippingCountry])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ShippingCountry', DELETED.[ShippingCountry], INSERTED.[ShippingCountry], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ShippingCountry], '') <> ISNULL(DELETED.[ShippingCountry], '')
			END

		IF UPDATE ([BasicAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'BasicAmount', DELETED.[BasicAmount], INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[BasicAmount], 0) <> ISNULL(DELETED.[BasicAmount], 0)
			END

		IF UPDATE ([FinalAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'FinalAmount', DELETED.[FinalAmount], INSERTED.[FinalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[FinalAmount], 0) <> ISNULL(DELETED.[FinalAmount], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([OrderDate])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'OrderDate', DELETED.[OrderDate], INSERTED.[OrderDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[OrderDate], '1900-01-01') <> ISNULL(DELETED.[OrderDate], '1900-01-01')
			END

		IF UPDATE ([IsDomestic])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'IsDomestic', DELETED.[IsDomestic], INSERTED.[IsDomestic], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[IsDomestic], 0) <> ISNULL(DELETED.[IsDomestic], 0)
			END

		IF UPDATE ([Currency])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'Currency', DELETED.[Currency], INSERTED.[Currency], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[Currency], '') <> ISNULL(DELETED.[Currency], '')
			END

		IF UPDATE ([ExpectedDispatchDays])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'ExpectedDispatchDays', DELETED.[ExpectedDispatchDays], INSERTED.[ExpectedDispatchDays], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[ExpectedDispatchDays], 0) <> ISNULL(DELETED.[ExpectedDispatchDays], 0)
			END

		IF UPDATE ([PaymentTerms])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'PaymentTerms', DELETED.[PaymentTerms], INSERTED.[PaymentTerms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[PaymentTerms], '') <> ISNULL(DELETED.[PaymentTerms], '')
			END

		IF UPDATE ([Notes])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'Notes', DELETED.[Notes], INSERTED.[Notes], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[Notes], '') <> ISNULL(DELETED.[Notes], '')
			END

		IF UPDATE ([Terms])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'Terms', DELETED.[Terms], INSERTED.[Terms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[Terms], '') <> ISNULL(DELETED.[Terms], '')
			END

		IF UPDATE ([TaxFormat])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'TaxFormat', DELETED.[TaxFormat], INSERTED.[TaxFormat], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[TaxFormat], '') <> ISNULL(DELETED.[TaxFormat], '')
			END

		IF UPDATE ([Discount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'Discount', DELETED.[Discount], INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[Discount], 0) <> ISNULL(DELETED.[Discount], 0)
			END

		IF UPDATE ([Total])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'Total', DELETED.[Total], INSERTED.[Total], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[Total], 0) <> ISNULL(DELETED.[Total], 0)
			END

		IF UPDATE ([SGST])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'SGST', DELETED.[SGST], INSERTED.[SGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[SGST], 0) <> ISNULL(DELETED.[SGST], 0)
			END

		IF UPDATE ([CGST])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'CGST', DELETED.[CGST], INSERTED.[CGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[CGST], 0) <> ISNULL(DELETED.[CGST], 0)
			END

		IF UPDATE ([IGST])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'IGST', DELETED.[IGST], INSERTED.[IGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[IGST], 0) <> ISNULL(DELETED.[IGST], 0)
			END

		IF UPDATE ([Tax])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'Tax', DELETED.[Tax], INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[Tax], 0) <> ISNULL(DELETED.[Tax], 0)
			END

		IF UPDATE ([RoundOff])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'RoundOff', DELETED.[RoundOff], INSERTED.[RoundOff], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[RoundOff], 0) <> ISNULL(DELETED.[RoundOff], 0)
			END

		IF UPDATE ([GrandTotal])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[OrderId], 'GrandTotal', DELETED.[GrandTotal], INSERTED.[GrandTotal], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[OrderId] = DELETED.[OrderId]
				WHERE ISNULL(INSERTED.[GrandTotal], 0) <> ISNULL(DELETED.[GrandTotal], 0)
			END
	END
END;
GO
ALTER TABLE [dbo].[Orders] ENABLE TRIGGER [Trg_Orders]
GO
/****** Object:  Trigger [dbo].[Trg_Permissions]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Trg_Permissions]
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
ALTER TABLE [dbo].[Permissions] ENABLE TRIGGER [Trg_Permissions]
GO
/****** Object:  Trigger [dbo].[Trg_QuotationProductsMapping]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_QuotationProductsMapping]
ON [dbo].[QuotationProductsMapping]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[QuotationProductsMapping]'
DECLARE @TableID INT = '14'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.MappingId = DELETED.MappingId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'QuotationId', NULL, INSERTED.[QuotationId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ProductId', NULL, INSERTED.[ProductId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Quantity', NULL, INSERTED.[Quantity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'QuoatedPrice', NULL, INSERTED.[QuotedPrice], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ProductName', NULL, INSERTED.[ProductName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'HSNCode', NULL, INSERTED.[HSNCode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Rate', NULL, INSERTED.[Rate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'BasicAmount', NULL, INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Discount', NULL, INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'Tax', NULL, INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'TotalAmount', NULL, INSERTED.[TotalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'ItemDescription', NULL, INSERTED.[ItemDescription], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.MappingId = DELETED.MappingId)
	BEGIN
		IF UPDATE ([QuotationId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'QuotationId', DELETED.[QuotationId], INSERTED.[QuotationId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[QuotationId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[QuotationId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([ProductId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ProductId', DELETED.[ProductId], INSERTED.[ProductId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ProductId], 0) <> ISNULL(DELETED.[ProductId], 0)
			END

		IF UPDATE ([Quantity])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Quantity', DELETED.[Quantity], INSERTED.[Quantity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Quantity], 0) <> ISNULL(DELETED.[Quantity], 0)
			END

		IF UPDATE ([QuotedPrice])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'QuoatedPrice', DELETED.[QuotedPrice], INSERTED.[QuotedPrice], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[QuotedPrice], 0) <> ISNULL(DELETED.[QuotedPrice], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([ProductName])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ProductName', DELETED.[ProductName], INSERTED.[ProductName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ProductName], '') <> ISNULL(DELETED.[ProductName], '')
			END

		IF UPDATE ([HSNCode])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'HSNCode', DELETED.[HSNCode], INSERTED.[HSNCode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[HSNCode], '') <> ISNULL(DELETED.[HSNCode], '')
			END

		IF UPDATE ([Rate])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Rate', DELETED.[Rate], INSERTED.[Rate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Rate], 0) <> ISNULL(DELETED.[Rate], 0)
			END

		IF UPDATE ([BasicAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'BasicAmount', DELETED.[BasicAmount], INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[BasicAmount], 0) <> ISNULL(DELETED.[BasicAmount], 0)
			END

		IF UPDATE ([Discount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Discount', DELETED.[Discount], INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Discount], 0) <> ISNULL(DELETED.[Discount], 0)
			END

		IF UPDATE ([Tax])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'Tax', DELETED.[Tax], INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[Tax], 0) <> ISNULL(DELETED.[Tax], 0)
			END

		IF UPDATE ([TotalAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'TotalAmount', DELETED.[TotalAmount], INSERTED.[TotalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[TotalAmount], 0) <> ISNULL(DELETED.[TotalAmount], 0)
			END

		IF UPDATE ([ItemDescription])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'ItemDescription', DELETED.[ItemDescription], INSERTED.[ItemDescription], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[ItemDescription], '') <> ISNULL(DELETED.[ItemDescription], '')
			END
	END
END;
GO
ALTER TABLE [dbo].[QuotationProductsMapping] ENABLE TRIGGER [Trg_QuotationProductsMapping]
GO
/****** Object:  Trigger [dbo].[Trg_Quotations]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_Quotations]
ON [dbo].[Quotations]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Quotations]'
DECLARE @TableID INT = '15'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.QuotationId = DELETED.QuotationId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'QuotationBy', NULL, INSERTED.[QuotationBy], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'LeadId', NULL, INSERTED.[LeadId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingCompanyName', NULL, INSERTED.[ShippingCompanyName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingEmailAddress', NULL, INSERTED.[ShippingEmailAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingAddress', NULL, INSERTED.[ShippingAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingCity', NULL, INSERTED.[ShippingCity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingState', NULL, INSERTED.[ShippingState], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingPincode', NULL, INSERTED.[ShippingPincode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ShippingCountry', NULL, INSERTED.[ShippingCountry], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'BasicAmount', NULL, INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'FinalAmount', NULL, INSERTED.[FinalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'QuotationDate', NULL, INSERTED.[QuotationDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'IsDomestic', NULL, INSERTED.[IsDomestic], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'Currency', NULL, INSERTED.[Currency], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'ExpectedDispatchDays', NULL, INSERTED.[ExpectedDispatchDays], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'PaymentTerms', NULL, INSERTED.[PaymentTerms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'Notes', NULL, INSERTED.[Notes], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'Terms', NULL, INSERTED.[Terms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'TaxFormat', NULL, INSERTED.[TaxFormat], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'Discount', NULL, INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'Total', NULL, INSERTED.[Total], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'SGST', NULL, INSERTED.[SGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'CGST', NULL, INSERTED.[CGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'IGST', NULL, INSERTED.[IGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'Tax', NULL, INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'RoundOff', NULL, INSERTED.[RoundOff], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[QuotationId], 'GrandTotal', NULL, INSERTED.[GrandTotal], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.QuotationId = DELETED.QuotationId)
	BEGIN
		IF UPDATE ([QuotationBy])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'QuotationBy', DELETED.[QuotationBy], INSERTED.[QuotationBy], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[QuotationBy], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[QuotationBy], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([LeadId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'LeadId', DELETED.[LeadId], INSERTED.[LeadId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[LeadId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[LeadId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([ShippingCompanyName])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingCompanyName', DELETED.[ShippingCompanyName], INSERTED.[ShippingCompanyName], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingCompanyName], '') <> ISNULL(DELETED.[ShippingCompanyName], '')
			END

		IF UPDATE ([ShippingEmailAddress])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingEmailAddress', DELETED.[ShippingEmailAddress], INSERTED.[ShippingEmailAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingEmailAddress], '') <> ISNULL(DELETED.[ShippingEmailAddress], '')
			END

		IF UPDATE ([ShippingAddress])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingAddress', DELETED.[ShippingAddress], INSERTED.[ShippingAddress], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingAddress], '') <> ISNULL(DELETED.[ShippingAddress], '')
			END

		IF UPDATE ([ShippingCity])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingCity', DELETED.[ShippingCity], INSERTED.[ShippingCity], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingCity], '') <> ISNULL(DELETED.[ShippingCity], '')
			END

		IF UPDATE ([ShippingState])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingState', DELETED.[ShippingState], INSERTED.[ShippingState], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingState], '') <> ISNULL(DELETED.[ShippingState], '')
			END

		IF UPDATE ([ShippingPincode])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingPincode', DELETED.[ShippingPincode], INSERTED.[ShippingPincode], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingPincode], '') <> ISNULL(DELETED.[ShippingPincode], '')
			END

		IF UPDATE ([ShippingCountry])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ShippingCountry', DELETED.[ShippingCountry], INSERTED.[ShippingCountry], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ShippingCountry], '') <> ISNULL(DELETED.[ShippingCountry], '')
			END

		IF UPDATE ([BasicAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'BasicAmount', DELETED.[BasicAmount], INSERTED.[BasicAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[BasicAmount], 0) <> ISNULL(DELETED.[BasicAmount], 0)
			END

		IF UPDATE ([FinalAmount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'FinalAmount', DELETED.[FinalAmount], INSERTED.[FinalAmount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[FinalAmount], 0) <> ISNULL(DELETED.[FinalAmount], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END

		IF UPDATE ([QuotationDate])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'QuotationDate', DELETED.[QuotationDate], INSERTED.[QuotationDate], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[QuotationDate], '1900-01-01') <> ISNULL(DELETED.[QuotationDate], '1900-01-01')
			END

		IF UPDATE ([IsDomestic])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'IsDomestic', DELETED.[IsDomestic], INSERTED.[IsDomestic], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[IsDomestic], 0) <> ISNULL(DELETED.[IsDomestic], 0)
			END

		IF UPDATE ([Currency])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'Currency', DELETED.[Currency], INSERTED.[Currency], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[Currency], '') <> ISNULL(DELETED.[Currency], '')
			END

		IF UPDATE ([ExpectedDispatchDays])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'ExpectedDispatchDays', DELETED.[ExpectedDispatchDays], INSERTED.[ExpectedDispatchDays], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[ExpectedDispatchDays], 0) <> ISNULL(DELETED.[ExpectedDispatchDays], 0)
			END

		IF UPDATE ([PaymentTerms])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'PaymentTerms', DELETED.[PaymentTerms], INSERTED.[PaymentTerms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[PaymentTerms], '') <> ISNULL(DELETED.[PaymentTerms], '')
			END

		IF UPDATE ([Notes])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'Notes', DELETED.[Notes], INSERTED.[Notes], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[Notes], '') <> ISNULL(DELETED.[Notes], '')
			END

		IF UPDATE ([Terms])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'Terms', DELETED.[Terms], INSERTED.[Terms], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[Terms], '') <> ISNULL(DELETED.[Terms], '')
			END

		IF UPDATE ([TaxFormat])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'TaxFormat', DELETED.[TaxFormat], INSERTED.[TaxFormat], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[TaxFormat], '') <> ISNULL(DELETED.[TaxFormat], '')
			END

		IF UPDATE ([Discount])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'Discount', DELETED.[Discount], INSERTED.[Discount], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[Discount], 0) <> ISNULL(DELETED.[Discount], 0)
			END

		IF UPDATE ([Total])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'Total', DELETED.[Total], INSERTED.[Total], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[Total], 0) <> ISNULL(DELETED.[Total], 0)
			END

		IF UPDATE ([SGST])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'SGST', DELETED.[SGST], INSERTED.[SGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[SGST], 0) <> ISNULL(DELETED.[SGST], 0)
			END

		IF UPDATE ([CGST])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'CGST', DELETED.[CGST], INSERTED.[CGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[CGST], 0) <> ISNULL(DELETED.[CGST], 0)
			END

		IF UPDATE ([IGST])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'IGST', DELETED.[IGST], INSERTED.[IGST], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[IGST], 0) <> ISNULL(DELETED.[IGST], 0)
			END

		IF UPDATE ([Tax])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'Tax', DELETED.[Tax], INSERTED.[Tax], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[Tax], 0) <> ISNULL(DELETED.[Tax], 0)
			END

		IF UPDATE ([RoundOff])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'RoundOff', DELETED.[RoundOff], INSERTED.[RoundOff], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[RoundOff], 0) <> ISNULL(DELETED.[RoundOff], 0)
			END

		IF UPDATE ([GrandTotal])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[QuotationId], 'GrandTotal', DELETED.[GrandTotal], INSERTED.[GrandTotal], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[QuotationId] = DELETED.[QuotationId]
				WHERE ISNULL(INSERTED.[GrandTotal], 0) <> ISNULL(DELETED.[GrandTotal], 0)
			END
	END
END;
GO
ALTER TABLE [dbo].[Quotations] ENABLE TRIGGER [Trg_Quotations]
GO
/****** Object:  Trigger [dbo].[Trg_Targets]    Script Date: 24-10-2025 10:03:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_Targets]
ON [dbo].[Targets]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[Targets]'
DECLARE @TableID INT = '16'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.TargetId = DELETED.TargetId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[TargetId], 'UserId', NULL, INSERTED.[UserId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[TargetId], 'TotalTarget', NULL, INSERTED.[TotalTarget], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[TargetId], 'Month', NULL, INSERTED.[Month], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[TargetId], 'Year', NULL, INSERTED.[Year], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[TargetId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.TargetId = DELETED.TargetId)
	BEGIN
		IF UPDATE ([UserId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[TargetId], 'UserId', DELETED.[UserId], INSERTED.[UserId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[TargetId] = DELETED.[TargetId]
				WHERE ISNULL(INSERTED.[UserId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[UserId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([TotalTarget])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[TargetId], 'TotalTarget', DELETED.[TotalTarget], INSERTED.[TotalTarget], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[TargetId] = DELETED.[TargetId]
				WHERE ISNULL(INSERTED.[TotalTarget], 0) <> ISNULL(DELETED.[TotalTarget], 0)
			END

		IF UPDATE ([Month])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[TargetId], 'Month', DELETED.[Month], INSERTED.[Month], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[TargetId] = DELETED.[TargetId]
				WHERE ISNULL(INSERTED.[Month], 0) <> ISNULL(DELETED.[Month], 0)
			END

		IF UPDATE ([Year])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[TargetId], 'Year', DELETED.[Year], INSERTED.[Year], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[TargetId] = DELETED.[TargetId]
				WHERE ISNULL(INSERTED.[Year], 0) <> ISNULL(DELETED.[Year], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[TargetId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[TargetId] = DELETED.[TargetId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END
	END
END;
GO
ALTER TABLE [dbo].[Targets] ENABLE TRIGGER [Trg_Targets]
GO
/****** Object:  Trigger [dbo].[Trg_Users]    Script Date: 24-10-2025 10:03:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Trg_Users]
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
ALTER TABLE [dbo].[Users] ENABLE TRIGGER [Trg_Users]
GO
/****** Object:  Trigger [dbo].[Trg_UserType]    Script Date: 24-10-2025 10:03:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Trg_UserType]
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
ALTER TABLE [dbo].[UserType] ENABLE TRIGGER [Trg_UserType]
GO
/****** Object:  Trigger [dbo].[Trg_UserTypeDashboardsPermissionsControl]    Script Date: 24-10-2025 10:03:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[Trg_UserTypeDashboardsPermissionsControl]
ON [dbo].[UserTypeDashboardsPermissionsControl]
FOR INSERT, UPDATE
AS BEGIN
DECLARE @TableName VARCHAR(100) = '[dbo].[UserTypeDashboardsPermissionsControl]'
DECLARE @TableID INT = '17'
DECLARE @BatchID VARCHAR(50) = NEWID()

-- INSERTION
IF EXISTS (SELECT 1 FROM INSERTED WHERE NOT EXISTS (SELECT 1 FROM DELETED WHERE INSERTED.MappingId = DELETED.MappingId))
	BEGIN
		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'UserTypeId', NULL, INSERTED.[UserTypeId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'DashboardsPermissionId', NULL, INSERTED.[DashboardsPermissionId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'HasAccess', NULL, INSERTED.[HasAccess], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;

		INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
		SELECT @TableName, @TableID, INSERTED.[MappingId], 'IsActive', NULL, INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'I' FROM INSERTED;
 	END
	
-- UPDATION
IF EXISTS (SELECT 1 FROM INSERTED JOIN DELETED ON INSERTED.MappingId = DELETED.MappingId)
	BEGIN
		IF UPDATE ([UserTypeId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'UserTypeId', DELETED.[UserTypeId], INSERTED.[UserTypeId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[UserTypeId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[UserTypeId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([DashboardsPermissionId])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'DashboardsPermissionId', DELETED.[DashboardsPermissionId], INSERTED.[DashboardsPermissionId], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[DashboardsPermissionId], '00000000-0000-0000-0000-000000000000') <> ISNULL(DELETED.[DashboardsPermissionId], '00000000-0000-0000-0000-000000000000')
			END

		IF UPDATE ([HasAccess])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'HasAccess', DELETED.[HasAccess], INSERTED.[HasAccess], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[HasAccess], 0) <> ISNULL(DELETED.[HasAccess], 0)
			END

		IF UPDATE ([IsActive])
			BEGIN
				INSERT INTO [dbo].[AuditLogs] ([TableName], [TableID], [TableKey], [FieldName], [PreviousValue], [UpdatedValue], [ModifiedBy], [ModifiedOn], [BatchID], [Operation])
				SELECT @TableName, @TableID, DELETED.[MappingId], 'IsActive', DELETED.[IsActive], INSERTED.[IsActive], INSERTED.[ModifiedBy], GETDATE(), @BatchID, 'U' FROM INSERTED JOIN DELETED ON INSERTED.[MappingId] = DELETED.[MappingId]
				WHERE ISNULL(INSERTED.[IsActive], 0) <> ISNULL(DELETED.[IsActive], 0)
			END
	END
END;
GO
ALTER TABLE [dbo].[UserTypeDashboardsPermissionsControl] ENABLE TRIGGER [Trg_UserTypeDashboardsPermissionsControl]
GO
/****** Object:  Trigger [dbo].[Trg_UserTypePermissionsControl]    Script Date: 24-10-2025 10:03:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[Trg_UserTypePermissionsControl]
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
ALTER TABLE [dbo].[UserTypePermissionsControl] ENABLE TRIGGER [Trg_UserTypePermissionsControl]
GO


GO
INSERT [dbo].[UserType] ([UserTypeId], [Name], [IsAdmin], [IsRegularUser], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'643b7b96-c455-489d-b09d-79e293d19dc3', N'Administrator Type', 1, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:41:27.600' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:41:27.600' AS DateTime), 1)
GO
INSERT [dbo].[Users] ([UserId], [Name], [Email], [Password], [UserTypeId], [HashPassword], [Contact], [ProfileImagePath], [Designation], [GSTId], [Address], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'790375f2-015c-46f5-bf07-ca6327fd39ba', N'Admin', N'admin@gmail.com', N'admin@123', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'$2b$10$J0T.Nh8MMepRJJ.iF3KGoeylgoMfe18BQwR1CxGH8G2bjOxfYZe6m', N'9876543210', N'https://megasuncrm-uploads.s3.ap-south-1.amazonaws.com/f76f7b60-9434-47a7-b733-0acf2207efa9-png-dryfruit.png', N'CEO', NULL, NULL, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:48:56.260' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-19T18:07:48.567' AS DateTime), 1)
GO
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'ea1b03d9-1489-4b5c-890f-081b0bc47f8c', N'Quotation', N'Sales', N'/icons/Quotation.png', N'/quotation', 4, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'58477884-5b16-451b-a62e-2db52c63d97e', N'Target', N'Sales', N'/icons/Target.png', N'/target', 3, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'e63c10f6-2de0-4215-bd15-5208a3c12822', N'User Management', N'Management', N'/icons/User_Management.png', N'/users', 7, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'7f47660b-6209-41fc-98f9-82ef4ebb5311', N'Followups', N'Sales', N'/icons/Follow-ups.png', N'/followups', 2, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'fc0356ac-4c59-4316-9cbe-aa04a47308d5', N'Dashboard', N'Analytics', N'/icons/Dashboard.png', N'/', 0, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'4f3799fd-3bd3-474b-b8a7-cf6181f7c5e0', N'My Leads', N'Sales', N'/icons/Leads.png', N'/leads', 1, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'5252ef8e-0119-4c2f-8be9-da5ec73c5427', N'Product Management', N'Management', N'/icons/Product_Management.png', N'/products', 8, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Type], [IconPath], [NavigationPath], [OrderBy], [isDefault], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'f439ee71-094c-4612-a6ca-fbeb24d5cc5a', N'Orders', N'Sales', N'/icons/Delivery.png', N'/orders', 5, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:52:15.983' AS DateTime), 1)
GO
INSERT [dbo].[DashboardsPermissions] ([DashboardsPermissionId], [Name], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive], [IconPath], [IconBGColor], [IconColor]) VALUES (N'3a24c8ee-e9a9-4451-a40e-0eb767b2c4b5', N'Targets', N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), 1, NULL, NULL, NULL)
INSERT [dbo].[DashboardsPermissions] ([DashboardsPermissionId], [Name], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive], [IconPath], [IconBGColor], [IconColor]) VALUES (N'610cd77f-4350-48e3-8ad1-74f552575d96', N'Followups', N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), 1, N'/icons/Follow-ups.png', N'#F6BABD', N'#890007')
INSERT [dbo].[DashboardsPermissions] ([DashboardsPermissionId], [Name], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive], [IconPath], [IconBGColor], [IconColor]) VALUES (N'2f1c7693-18d4-4245-a778-7c95482fe396', N'Leads', N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), 1, N'/icons/Leads.png', N'#EFDAAC', N'#825900')
INSERT [dbo].[DashboardsPermissions] ([DashboardsPermissionId], [Name], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive], [IconPath], [IconBGColor], [IconColor]) VALUES (N'dfc0b951-3945-4c95-8b23-81f57fe9fd6d', N'Orders', N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), 1, N'/icons/Delivery.png', N'#A7E2AF', N'#00680F')
INSERT [dbo].[DashboardsPermissions] ([DashboardsPermissionId], [Name], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive], [IconPath], [IconBGColor], [IconColor]) VALUES (N'cb500179-1d85-4b57-9e6b-df843d7d05eb', N'Quotations', N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-16T23:49:09.767' AS DateTime), 1, N'/icons/Quotation.png', N'#492AE44D', N'#684AF9')
GO

GO
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'afe389d7-5599-44fd-a0cb-00218e59006b', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'e63c10f6-2de0-4215-bd15-5208a3c12822', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'20ee7efe-0955-4abe-abcf-2e8d4d081904', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'fc0356ac-4c59-4316-9cbe-aa04a47308d5', 0, 1, 0, 0, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'bcc7b897-2d16-4e5a-abe9-3a5d71395e9f', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'7f47660b-6209-41fc-98f9-82ef4ebb5311', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'3972ec8d-b61c-43ad-b0f1-3d96b249a9fa', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'f439ee71-094c-4612-a6ca-fbeb24d5cc5a', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'a672aa60-6abb-4752-b485-45e31381d2bd', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'ea1b03d9-1489-4b5c-890f-081b0bc47f8c', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'4a5b5484-5f52-424d-a279-488636b580c7', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'4f3799fd-3bd3-474b-b8a7-cf6181f7c5e0', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'fc66c128-ea0b-4b4b-b0e4-6ed3d4e34701', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'58477884-5b16-451b-a62e-2db52c63d97e', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
INSERT [dbo].[UserTypePermissionsControl] ([MappingId], [UserTypeId], [PermissionId], [CreateAccess], [ReadAccess], [UpdateAccess], [DeleteAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'748c9fa6-c5f4-46ec-bc77-d14a1a7ec7c4', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'5252ef8e-0119-4c2f-8be9-da5ec73c5427', 1, 1, 1, 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-09-02T21:53:04.973' AS DateTime), 1)
GO
INSERT [dbo].[UserTypeDashboardsPermissionsControl] ([MappingId], [UserTypeId], [DashboardsPermissionId], [HasAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'58d32c5b-aaf9-4588-98a5-79fd304d68b6', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'dfc0b951-3945-4c95-8b23-81f57fe9fd6d', 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), 1)
INSERT [dbo].[UserTypeDashboardsPermissionsControl] ([MappingId], [UserTypeId], [DashboardsPermissionId], [HasAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'47ddb9fb-1713-476c-bced-c534495a1c0e', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'610cd77f-4350-48e3-8ad1-74f552575d96', 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), 1)
INSERT [dbo].[UserTypeDashboardsPermissionsControl] ([MappingId], [UserTypeId], [DashboardsPermissionId], [HasAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'4ce652c1-818c-40e4-9c54-de798a9238df', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'3a24c8ee-e9a9-4451-a40e-0eb767b2c4b5', 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), 1)
INSERT [dbo].[UserTypeDashboardsPermissionsControl] ([MappingId], [UserTypeId], [DashboardsPermissionId], [HasAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'71c0f594-e9a4-46e4-bf70-e13223020a6c', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'cb500179-1d85-4b57-9e6b-df843d7d05eb', 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), 1)
INSERT [dbo].[UserTypeDashboardsPermissionsControl] ([MappingId], [UserTypeId], [DashboardsPermissionId], [HasAccess], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsActive]) VALUES (N'fb99f0af-08a8-4c09-bce3-f896b4eea71c', N'643b7b96-c455-489d-b09d-79e293d19dc3', N'2f1c7693-18d4-4245-a778-7c95482fe396', 1, N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), N'790375f2-015c-46f5-bf07-ca6327fd39ba', CAST(N'2025-10-18T20:48:49.173' AS DateTime), 1)
GO



ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_CreatedBy]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_ModifiedBy]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_UserType_UserTypeId] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserType] ([UserTypeId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_UserType_UserTypeId]
GO
ALTER TABLE [dbo].[UserType]  WITH CHECK ADD  CONSTRAINT [FK_UserType_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserType] CHECK CONSTRAINT [FK_UserType_CreatedBy]
GO
ALTER TABLE [dbo].[UserType]  WITH CHECK ADD  CONSTRAINT [FK_UserType_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserType] CHECK CONSTRAINT [FK_UserType_ModifiedBy]
GO