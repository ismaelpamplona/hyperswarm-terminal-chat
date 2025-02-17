## 1. Peer Connection & Discovery

1. A peer joins the Hyperswarm network by subscribing to a common topic (`"p2p-chat"`).
2. The peer discovers existing peers and establishes direct socket connections.
3. When a peer connects, it:

   - Requests the full peer list from a single randomly chosen peer.
   - Adds those peers to its local list and connects to them.
   - Broadcasts its own ID to all connected peers

4. When a peer disconnects, it:

   - Sends a disconnect signal to all peers before leaving.
   - Peers remove the disconnected peer from their local list.
   - If a peer disconnects unexpectedly, it will be detected when another peer fails to send a message to it.

## 2. Message Exchange Flow

### Public Message (Broadcast)

1. A peer sends a message to all connected peers.
2. Each peer receives the message and displays it in the terminal.

### Direct Message (Private Chat)

1. A peer selects a specific recipient from the stored peer list.
2. The message is sent only to the selected peer’s socket.
3. The recipient receives and displays the private message.

## Diagram

```mermaid
sequenceDiagram
    participant Peer A
    participant Peer B
    participant Hyperswarm DHT

    %% First peer joins
    Note right of Peer A: First peer starts
    Peer A->>Hyperswarm DHT: Subscribe to "p2p-chat" topic
    Hyperswarm DHT-->>Peer A: No peers found (waiting...)
    Note right of Peer A: Waiting for other peers...

    %% Second peer joins
    Note right of Peer B: Second peer starts
    Peer B->>Hyperswarm DHT: Subscribe to "p2p-chat" topic
    Hyperswarm DHT-->>Peer B: Peer A found!

    %% Peer discovery and connection
    Peer B->>Peer A: Request peer list
    Peer A-->>Peer B: Send peer list (currently just A)
    Peer B->>Peer A: Establish direct connection
    Peer A->>Hyperswarm DHT: Update peer info

    %% Messaging starts
    Note right of Peer A: Messaging is now possible
    Peer A->>Peer B: "Hello, Peer B!"
    Peer B-->>Peer B: Display message in terminal
```
