alter table DerogationHeadersItems add WorkOrderId bigint default 0 not null;
alter table DerogationHeadersItems add PartNoId bigint default 0 not null;
alter table DerogationHeadersItems add APartNoId bigint default 0 not null;
go

update DerogationHeadersItems set WorkOrderId = (select WorkOrderId from WorkOrders where dbo.DerogationHeadersItems.WorkOrder = WorkOrders.OrderNo);
update DerogationHeadersItems set PartNoId = (select MaterialId from Materials where dbo.DerogationHeadersItems.PartNo = Materials.PartNo);
update DerogationHeadersItems set APartNoId = (select MaterialId from Materials where dbo.DerogationHeadersItems.APartNo = Materials.PartNo);
go
