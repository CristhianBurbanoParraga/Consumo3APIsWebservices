create table product (
id serial not null,
name varchar(50) null,
price decimal(3,2) null,
description varchar(200) null,
primary key (id));

create table person (
id serial not null,
firstname varchar(50) null,
lastname varchar(50) null,
role varchar(2) null,
primary key (id));

create table sale (
id serial not null,
idproduct int not null,
idperson int not null,
quantity int null,
total decimal(3,2) null,
observation varchar(150) null,
primary key (id),
foreign key (idproduct) references product (id),
foreign key (idperson) references person (id));

SELECT * FROM person;
SELECT * FROM product;
SELECT * FROM sale;

insert into product (name,price,description) values ('Corviche',0.5,'Verde y pescado');
insert into person (firstname,lastname,role) values ('Cristhian','Burbano','C');
insert into sale (idproduct,idperson,quantity,total,observation) values (2,1,2,1.5,'Sin mayonesa');



