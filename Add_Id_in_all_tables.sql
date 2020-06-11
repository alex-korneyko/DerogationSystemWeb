alter table DerogationDepartments add Id bigint not null identity (1, 1);
alter table DerogationDepartments add constraint PK_derg_dept primary key (Id);

alter table DerogationDocs add Id bigint not null identity (1, 1);
alter table DerogationDocs add constraint PK_derg_doc primary key (Id);

alter table DerogationHeadersItems add Id bigint not null identity (1, 1);
alter table DerogationHeadersItems add constraint PK_derg_item primary key (Id);

alter table DerogationOperators add Id bigint not null identity (1, 1);
alter table DerogationOperators add constraint PK_derg_operator primary key (Id);

alter table Users add Id bigint not null identity (1, 1);
alter table Users add constraint PK_user primary key (Id);