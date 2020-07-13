alter table dbo.DerogationDepartments drop constraint C_DD_Comment;
alter table dbo.DerogationDepartments alter column Comment nvarchar(500);
alter table dbo.DerogationDepartments add constraint C_DD_Comment default '' for Comment;

alter table dbo.DerogationDepartments drop constraint C_DD_CancellationReason;
alter table dbo.DerogationDepartments alter column CancellationReason nvarchar(500);
alter table dbo.DerogationDepartments add constraint C_DD_CancellationReason default '' for CancellationReason;

alter table dbo.DerogationHeadersItems alter column Reason nvarchar(500);

alter table dbo.DerogationHeadersItems alter column Action nvarchar(500);