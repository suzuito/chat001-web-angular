# Smoketest

[[TOC]]

## Definitions

### Errors

#### Fatal

* Cannot continue to process on page.
* Move to error page.

#### Error

* Can continue to process.
* Notification to user by warn Snackbar.

### Notification

All notifications are asynchronous.
Notified by Snackbar.
Type of notifications are either info or warn.

## Routes

### AppRootComponent

* Buttons of sub header display data properly.
* Notifications for recieving agent message.
  * With sound and text
* If API response with http status 5XX, it's fatal error.

#### SidemenuComponent

* Open side menu using right up toggle opener.
* Close side menu using right up toggle opener.
* Close side menu when an user click out of side menu area.
* Display agent name, description and image.
* Display shortened agent name, description if there is the one.
* Click "画像の更新" and route to ProfileAvatarEditorComponent
* Click "編集する" and open ProfileEditor
* Click "新着順" and route to RoomsComponent with query 'd=0'
* Click "人気順" and route to RoomsComponent with query 'd=1'
* Click "アクティブユーザー" and route to AgentsComponent
* Click "ダイレクトメッセージ" and route to AgentMessagesComponent
* Click "部屋の作成" and route to CreateRoomComponent
* Display RoomsAgentIn
* Click a room in which agent is and route to RoomMessageComponent
* Notifications for recieving room message.

#### AgentAvatarEditorComponent

* Display DialogConfirm when user will leave this page.

#### RoomsComponent

* Display "部屋がありません" if displayed rooms are nothing.
* Display created room by other any users.
* There is no private room in displayed rooms.
* Change header title.
* Accessing without query 'd' display rooms order by createdAt.
* Accessing with query 'd=0' display rooms order by createdAt.
* Accessing with query 'd=1' display rooms order by agents.
* Displayed createdAt, agents and other icons per a room.
* Click "もっと読み込む" and load more rooms.
* Click a room and route to room.
* Click a room with password, display password inputter and route to room.

#### AgentsComponent

* Display "アクティブユーザーがいません" if displayed agents are nothing.
* Change header title.
* Display latest agents top 30.
* Click a agent and display DialogProfile.
* Click "リクエスト" on a DialogProfile and display DialogRequester.
* Click "招待する" on a DialogProfile and display DialogIntroducer.

#### AgentMessagesComponent

* Display "メッセージがありません" if displayed agent messages are nothing.
* Change header title.
* Display latest messages top 30.
* Click "もっと読み込む" and load more agent messages.
* Mark unread message with accent color.
* Set number of unread messages to zero.

##### Introduction message

* Click agent button and display DialogProfile with readonly.
* Click agent button and display DialogRoomProfile with readonly.
* Display "入室する" button and click this and enter the room and route the room.
* If agent already enters room then message is not sent to the agent.

##### Request message

* Click agent button and display DialogProfile with readonly.
* Display "承認する" button and click this and enter the room and route the room.

### RoomCreatorComponent

* Display name and description of room.
* Display error message when invalid room input.
* Random selection of name and description.
* Set default value to each input by queries.
* Set default value to each input without queries.
* Click "作成" and route to created room.
* Call Error event if creating room is failed.
* Save editing state when user leave this page.

### RoomComponent

* Click group icon and route to RoomMembers.
* Click settings icon and route to RoomInfo.
* Click clear icon and exit the room and route to another room agent in.
* Click notification icon and open menu of agent messages.

#### RoomMessagesComponent

* Display "メッセージがありません" if displayed room messages are nothing.
* Display messages.
* Click "もっと読み込む" and load more room messages.
* Open agent's menus when click agent.
* Click "情報" menu and open DialogProfile with read only.
* Click "リクエスト" menu and open DialogRequester.
* Scroll when agent is at bottom of scroll and posted new message.

##### URLMessage

* Click url and open tag of the url.

##### ImageMessage

* Image width is window.innerWidth * 0.5.
* Click image and open new tag of the image.

##### YouTubeMessage

* Frame width is window.innerWidth * 0.5.
* Frame height is window.innerWidth * 0.5.

##### Inputter

* Input message.
* Open input bottom sheet when click open toggle.
* Disable close of bottom sheet.
* Open image selector DialogImgUploadConfirmer when click open image icon.
* Confirm image upload when image is selected.
* Message is posted when enters key.
* Display error message when invalid room input.

#### RoomMemberComponent

* Click role button to change the role and open DialogRoleSelector.
* Disable role button if you doesn't have admin role.
* Disable "招待する" button if you doesn't check any checkbox.
* Click "招待する" button and open DialogIntroducer.
* Click agent icon button and open DialogAgent with readonly.
* Display all room members.
* Display user himself.

#### RoomInfoComponent

* Display name and description of room.
* Display error message when invalid room input.
* Random selection of name and description.
* Click "更新" and open DialogUpdateConfirmRoomInfoComponent.
* Readonly if user doesn't have permission.
* Call Error event if creating room is failed.
* Save editing state when user leave this page.

### ErrorComponent

* Display error title, description and reload link.

## Dialogs

### ProfileEditor

* Display user name and description.
* Disable update button if name is empty.
* Click update button, close dialog and update user profile.
* Click cancel button and close dialog.
* If updating profile is success, notify success message.
* Disable close by clicking out of range.

### DialogRequester

* Display user name, description and icon.
* Disable click button when "一言メッセージ" is empty.
* Input "一言メッセージ" and click "リクエストを送る", close the dialog. Display "リクエストを送りました" on snackbar.
* Click cancel button and close dialog.
* Disable close by clicking out of range.

### DialogIntroducer

* Display selected user names and selector for room to introduce.
* Introduced rooms are where agent in.
* Display "招待できる部屋がありません" on snackbar when agent enters no rooms.
* Disable "はい" when room is not selected.
* Click cancel button and close dialog.
* Disable close by clicking out of range.

### DialogProfile

* Display name, description and icon.
* Display no action buttons if readonly is true.
* Close dialog when click out range of dialog.

### DialogRoomProfile

* Display name and description.
* Display no action buttons if readonly is true.
* Close dialog when click out range of dialog.

### DialogImgUploadConfirmer

* Display "はい" and "いいえ" button.
* Click cancel button and close dialog.
* Disable close by clicking out of range.

### DialogRoleSelector

* Display selector of "member" and "owner"
* Click cancel button and close dialog.
* Disable close by clicking out of range.
