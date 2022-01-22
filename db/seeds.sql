INSERT INTO department (name)
VALUES  ("Management"),
        ("Software Engineering"),
        ("Legal"),
        ("Sales"),
        ("Accounting");

INSERT INTO role (department_id, title, salary)
VALUES  (1, "Manager", 200000),
        (1, "Executive Assistant", 100000),
        (2, "Lead Software Developer", 150000),
        (2, "Assistant Software Developer", 100000),
        (3, "Chief Legal Counsel", 180000),
        (3, "Paralegal", 80000),
        (4, "Head Salesman", 160000),
        (4, "Salesman", 120000),
        (5, "Head Accountant", 180000),
        (5, "Accountant", 140000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Smith', 1, NULL),
        ('Mark', 'Alamo', 1, 1),
        ('Terry', 'Cosgrove', 2, 1),
        ('Carrie', 'Hitt', 2, 2),
        ('Andrew', 'Thomas', 3, 1),
        ('Winston', 'Leslie', 3, 3),
        ('Giselle', 'Hartley', 4, 1),
        ('Michael', 'Dommel', 4, 4),
        ('Henrey', 'Kiley', 5, 1),
        ('Charlie', 'Glennon', 5, 5);
