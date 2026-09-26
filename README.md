# Tic Tac Toe

A classic two-player Tic Tac Toe game that runs in the browser. Players share one device and take turns placing a cross (X) and a circle (O). The first to line up three marks wins. Scores stay on screen across rounds until you reset them.

## Play

There is no install or build step. The app is plain HTML, CSS, and JavaScript.

1. Open `index.html` in a browser, or serve this folder with any static file server.
2. Choose **Play game**.
3. Player X starts. Click an empty cell to place a mark.
4. After a win or a draw, choose **New round** to play again. X always starts the next round.
5. **Reset scores** clears the scoreboard and starts a fresh round.
6. **Back to home** returns to the landing page.

### Rules

- Two players share one board.
- X and O alternate turns.
- A player wins by placing three of their marks in a row, column, or diagonal.
- If every cell is filled and nobody has three in a row, the round is a draw.
- The winning line is highlighted, and the board stays locked until you start a new round.

## Project files

| File | Role |
| --- | --- |
| `index.html` | Landing page with a preview board and a link into the game |
| `game.html` | Scoreboard, status line, board, and round controls |
| `script.js` | Turns, win and draw detection, and scoring |
| `styles.css` | Layout and theme |
| `logo.svg` | App icon used on the landing page and as the favicon |

## Accessibility

- The board is a grid of buttons. Each cell label updates when a mark is placed.
- Status changes are announced with a live region.
- Marks are SVG shapes, so X and O are distinct beyond color.
