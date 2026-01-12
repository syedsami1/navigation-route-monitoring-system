# Solution Documentation – Question 2 (Section 1)

## 1. Understanding of the Problem Statement
The objective is to design a navigation system that allows an operator to
monitor a vessel's movement along a planned route using a 2D chart-like view.

The system must display the vessel, route waypoints, and navigation data
while allowing real-time simulation.

## 2. Approach and Design
The solution uses an HTML canvas for rendering the navigation display.
Waypoints define the route, and the vessel moves incrementally toward
each waypoint.

The design is modular so that additional features such as zooming,
orientation modes, or route editing can be added later.

## 3. Solution Explanation
- The route is defined as an array of waypoints
- The vessel starts at the first waypoint
- JavaScript animation updates the vessel position
- Navigation details are shown in an information panel
- Start and pause controls manage the simulation flow

## 4. Testing and Verification
The application was tested by running the simulation multiple times.
The vessel follows the route correctly and updates position information
without errors.
