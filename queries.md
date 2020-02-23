# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
SELECT p.ProductName, c.CategoryName
FROM Products p JOIN Categories c
ON p.CategoryID = C.CategoryID;

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
SELECT o.OrderID, s.ShipperName, o.OrderDate
FROM Orders o JOIN Shippers s
	ON o.ShipperID = s.ShipperID
WHERE o.OrderDate < '1997-01-09';

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
SELECT p.ProductName, d.Quantity
FROM OrderDetails d JOIN Products p
ON d.ProductID = p.ProductID
WHERE d.OrderID = '10251'
ORDER BY p.ProductName;

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
SELECT o.OrderID, c.CustomerName as CustomerFullName, e.LastName as EmployeeLastName
FROM Customers c, Employees e JOIN Orders o 
ON o.CustomerID = c.CustomerID AND o.EmployeeID = e.EmployeeID;

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.
SELECT c.CategoryName, COUNT(p.ProductID) AS Count
FROM Categories c JOIN Products p ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryID;

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records.
SELECT o.OrderID, COUNT(d.OrderDetailID) AS ItemCount
FROM Orders o JOIN OrderDetails d ON o.OrderID = d.OrderID
GROUP BY o.OrderID;