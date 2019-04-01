# Chat001WebAngular

## Resources

|||
|---|---|
|se_maoudamashii_onepoint28.wav|[link](https://maoudamashii.jokersounds.com)|

## Smoketest

### Error definition

* Fatal
  * Cannot continue to process on page.
  * Move to error page.
* Error / Warn
  * Can continue to process.
  * Notification to user by snackbar

### AppRootComponent

* Buttons of sub header display data properly.

* Notifications for recieving agent message.
  * With sound and text

Error

* If API response with http status 5XX, it's fatal error.

### SidemenuComponent

* Can open side menu using right up toggle opener.
* Can close side menu using right up toggle opener.
* Display agent name, description and image.
* Display shortened agent name, description if there is the one.

* Click "画像の更新" and route to ProfileAvatarEditorComponent
* Click "編集する" and open dialog of ProfileEditorComponent

* Click "新着順" and route to RoomsComponent with query 'd=0'
* Click "人気順" and route to RoomsComponent with query 'd=1'
* Click "アクティブユーザー" and route to AgentsComponent
* Click "ダイレクトメッセージ" and route to AgentMessagesComponent
* Click "部屋の作成" and route to CreateRoomComponent

* Display RoomsAgentIn
* Click a room in which agent is and route to RoomMessageComponent

* Notifications for recieving room message.

### Rooms

* Display "部屋がありません" if displayed rooms are nothing.
* Change header title.
* Accessing without query 'd' display rooms order by createdAt.
* Accessing with query 'd=0' display rooms order by createdAt.
* Accessing with query 'd=1' display rooms order by agents.
* Displayed createdAt, agents and other icons per a room.
* Click "もっと読み込む" and load more rooms.
* Click a room and route to room.
* Click a room with password, display password inputter and route to room.

### Agents

* Display "アクティブユーザーがいません" if displayed agents are nothing.
* Change header title.
* Display latest agents top 30.
* Click a agent and display dialog of agent.
* Click "リクエスト" on a dialog of agent and display request dialog.
* Click "招待する" on a dialog of agent and display introduction dialog.

### Request dialog

* Display user name, description and icon.
* Disable click button when "一言メッセージ" is empty.
* Input "一言メッセージ" and click "リクエストを送る", close dialog. Display "リクエストを送りました" on snackbar.
* Close dialog when click out range of dialog.

### Introduction dialog

* Display selected user names and selector for room to introduce.
* Introduced rooms are where agent in.
* Display "招待できる部屋がありません" on snackbar when agent enters no rooms.
* Disable "はい" when room is not selected.
* Close dialog when click out range of dialog.

### Agent Messages

* Display "メッセージがありません" if displayed agent messages are nothing.
* Change header title.
* Display latest messages top 30.
* Click "もっと読み込む" and load more agent messages.
* Mark unread message with accent color.
* Set number of unread messages to zero.

#### Introduction message

* Click agent button and display agent dialog with readonly.
* Click agent button and display room dialog with readonly.
* Display "入室する" button and click this and enter the room and route the room.

#### Request message

* Click agent button and display agent dialog with readonly.
* Display "承認する" button and click this and enter the room and route the room.

### RoomCreator

* Display name and description of room.
* Random selection of name and description.
* Set default value to each input by queries.
* Set default value to each input without queries.
* Click "作成" and route to created room.

### RoomMessages

* Display "メッセージがありません" if displayed room messages are nothing.
* Display messages.
* Click "もっと読み込む" and load more room messages.
* Open agent's menus when click agent.
* Click "情報" menu and open dialog agent dialog with read only.
* Click "リクエスト" menu and open dialog request dialog.
* Scroll when agent is at bottom of scroll and posted new message.

#### URLMessage

* Click url and open tag of the url.

#### ImageMessage

* Image width is window.innerWidth * 0.5.
* Click image and open new tag of the image.

#### YouTubeMessage

* Frame width is window.innerWidth * 0.5.
* Frame height is window.innerWidth * 0.5.

#### Inputter

* Input message.
* Open input bottom sheet when click open toggle.
* Open image selector dialog when click open image icon.
* Confirm image upload when image is selected.
* Message is posted when enters key.
