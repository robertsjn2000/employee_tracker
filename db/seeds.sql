INSERT INTO department (name)
VALUES  ("Management"),
        ("Software Engineering"),
        ("Legal"),
        ("Sales"),
        ("Accounting");

INSERT INTO role (department_id, title, salary)
VALUES  (1, "Manager", 200000),
        (1, "Executive Assistant", 100000),
        (2, "Lead Software Developer", 150000);