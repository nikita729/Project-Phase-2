

/****** Object:  Table [dbo].[addproperty]    Script Date: 13-04-2020 20:13:23 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[addproperty](
	[propid] [int] IDENTITY(1,1) NOT NULL,
	[address] [varchar](255) NOT NULL,
	[neighbor] [varchar](255) NULL,
	[sqft] [varchar](50) NULL,
	[garage] [varchar](50) NULL,
	[publictransp] [varchar](50) NULL,
	[showworkspace] [varchar](50) NULL,
	[username] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[propid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[addworkspace]    Script Date: 13-04-2020 20:13:23 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[addworkspace](
	[wkid] [int] IDENTITY(1000,1) NOT NULL,
	[wkname] [nvarchar](100) NOT NULL,
	[wktype] [nvarchar](255) NULL,
	[scap] [nvarchar](50) NULL,
	[availdate] [nvarchar](50) NULL,
	[lterm] [nvarchar](50) NULL,
	[price] [int] NULL,
	[smoking] [nvarchar](50) NULL,
	[showinlisting] [nvarchar](50) NULL,
	[propid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[wkid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[signup]    Script Date: 13-04-2020 20:13:23 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[signup](
	[Name] [varchar](255) NOT NULL,
	[Phone] [varchar](255) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[Role] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


USE [master]

ALTER DATABASE [mydb] SET  READ_WRITE 

