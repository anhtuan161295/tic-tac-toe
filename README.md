Below are answers to some questions from the tutorials below: https://reactjs.org/tutorial/tutorial.html#wrapping-up
Thanks this guy for solutions: https://github.com/DusanSacha/react-fb-tutorial
These questions was so hard for beginner :(

1. Display the location for each move in the format (col, row) in the move history list.
-> In 3rd questions, we already made the 2 for loop to render a board.
We can get the row and column in Board class.

Every move history is created when we click, it means we need to edit the click functions aka handleClick. 
But handleClick is in Game class, how can we do it ?
We can pass the function to the Board, the Board will pass the function with row and column parameters in it. So when every Square is clicked, the function will change state values on Game class.

In handleClick function, we add 2 parameter row and col.
When square is clicked, we store the row and column value of the square in the state.
Then we have the row and column value now.

2. Bold the currently selected item in the move list.
-> When we selected the item in move list, we called jumpTo function.
This jumpTo function set the stepNumber in the state.
In handleClick function, stepNumber = history length, it means stepNumber is the history list index.
We render the Game based on the stepNumber aka history index.
So the stepNumber is current index, when we map a history e.g history.map((value, index) we also have the index.
What we need to do is compare the stepNumber with an index from the map.
We need a boolean value to store the compare result and add an CSS class to bold the currently selected item.

3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
-> Board class need 2 for loop to make a board with x row and y column.
In every column, render square.
In every row, we need to store the columns in an array and add the rows array to the square array.
We also need to add the counter to identify the squares.
In calculateWinner function, it calculate winner from 0 so the counter will begin from 0.

4. Add a toggle button that lets you sort the moves in either ascending or descending order.
-> We need a change order button and a function when the button is clicked.
We also need a boolean value to know the order is ascending or descending.
So we add an ascendingOrder in the Game state.
When the change order button is clicked, it will trigger toggleOrder function and change the ascendingOrder value.
We need to sort the move history list based on the ascendingOrder value.
Remember when we map the history, we have the key attribute with index value from the map in every li e.g <li key={index}>
We will sort the moves by the key.
We sort descending when ascendingOrder = false

5. When someone wins, highlight the three squares that caused the win.
-> To catch the event win, we need an function aka calculateWinner function.
The win event happens when X or O is in a line. 
In this function we already had all the possible chance and the list of square indexes e.g [0, 1, 2] when the win event happens.
We just need to return the list of square indexes along with the winner name (X or O).
We set the list of winner squares to a variable and pass it to the Board.
In the Board, we already have the square index when we make the loops.
We need to compare if the square index 
We need to pass the compare result to the square.
To highlight the square we need to add an CSS class to square, we get the compare result from props to know when to add an CSS class.

6. When no one wins, display a message about the result being a draw.
-> When the result is a draw, it means all 9 squares are filled with value. 
We need a function to check all squares is not null.