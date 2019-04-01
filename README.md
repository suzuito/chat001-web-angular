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

* Click "新着順" and route to RoomsComponent
* Click "人気順" and route to RoomsComponent
* Click "アクティブユーザー" and route to AgentsComponent
* Click "ダイレクトメッセージ" and route to AgentMessagesComponent
* Click "部屋の作成" and route to CreateRoomComponent

* Display RoomsAgentIn
* Click a room in which agent is and route to RoomMessageComponent