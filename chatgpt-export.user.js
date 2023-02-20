// ==UserScript==
// @name          ChatGPT save button
// @author        Me
// @description   Adds save button.
// @namespace     meeee
// @version       1.0.0
// @match         https://chat.openai.com/*
// @grant         none
// @run-at        document-start
// ==/UserScript==

(function() {
	'use strict';

    // I hate javascript
    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    const HTML_TEMPLATE = b64DecodeUnicode(`PGh0bWw+CiAgPGhlYWQ+Cgk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJYm9keXsKCQliYWNrZ3JvdW5kOiAjMDAwOwoJCW1hcmdpbjogMDsKCX0KCS5yZXBsaWVzewoJCW1heC13aWR0aDogNzVjaDsKCQlkaXNwbGF5OiBmbGV4OwoJCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CgkJYWxpZ24taXRlbXM6IGNlbnRlcjsKCQlqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKCQltYXJnaW46IDAgYXV0bzsKCQlmb250LWZhbWlseTogU8O2aG5lLHVpLXNhbnMtc2VyaWYsc3lzdGVtLXVpLC1hcHBsZS1zeXN0ZW0sU2Vnb2UgVUksUm9ib3RvLFVidW50dSxDYW50YXJlbGwsTm90byBTYW5zLHNhbnMtc2VyaWYsSGVsdmV0aWNhIE5ldWUsQXJpYWwsQXBwbGUgQ29sb3IgRW1vamksU2Vnb2UgVUkgRW1vamksU2Vnb2UgVUkgU3ltYm9sLE5vdG8gQ29sb3IgRW1vamk7CgkJZm9udC1zaXplOiAxNnB4OwoJCWNvbG9yOiAjZDFkNWRiOwoJCXRhYi1zaXplOiA0OwoJCS13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsKCX0KCS5yZXBsaWVzID4gKiB7CgkJd2lkdGg6IDEwMCU7CgkJZmxleDogMTsKCQkvKiBmb3Igc29tZSByZWFzb24gb24gdGhlIG9mZmljaWFsCgkJY2hhdCBHUFQgc2l0ZSB0aGUgYm90dG9tIGhhcyBhIG1hcmdpbgoJCXN0YWNrZWQgd2l0aCBwYWRkaW5nLCBzbyBpdCdzIDI0cHggb24KCQl0b3AgYW5kIDM3cHggb24gYm90dG9tICovCgkJcGFkZGluZzogMjRweCAxMnJlbSAzN3B4IDEycmVtOwoJCS8qCgkJdGhlIE9wZW5BSSBTVkcgaXMgYWJzb2x1dGVseSBwb3NpdGlvbmVkCgkJc28gbWFrZSBzdXJlIHRoaXMgaGFzIGEgbWluLWhlaWdodCBpbiB0aGUKCQljYXNlIG9mIHNpbmdsZSBsaW5lIHJlc3BvbnNlcwoJCSovCgkJbWluLWhlaWdodDogMjRweDsKCQlsaW5lLWhlaWdodDogMS43NTsKCQl3aGl0ZS1zcGFjZTogcHJlLXdyYXA7Cgl9CgkKCS5yZXBsaWVzIG9sIGxpLCAucmVwbGllcyBvbCB1bCB7CgkJbWFyZ2luOiAwLjVleDsKCX0KCQoJLnJlcGxpZXMgb2wgbGk6Om1hcmtlciB7CgkJY29sb3I6IHJnYigxNTYsIDE2MywgMTc1KTsKCQlmb250LXdlaWdodDogNDAwOwoJfQoJCgkucmVwbGllcyA+IC51c2VyewoJCXBvc2l0aW9uOiByZWxhdGl2ZTsKCQliYWNrZ3JvdW5kOiByZ2JhKDUyLDUzLDY1KTsKCX0KCS5yZXBsaWVzID4gLmdwdHsKCQlwb3NpdGlvbjogcmVsYXRpdmU7CgkJYmFja2dyb3VuZDogcmdiYSg2OCw3MCw4NCk7Cgl9CgkKCS5yZXBsaWVzID4gKiB7CgkJZGlzcGxheTogZmxleDsKCQlmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJCWdhcDogMXJlbTsKCX0KCQoJcDpmaXJzdC1jaGlsZCB7CgkJbWFyZ2luLXRvcDogMDsKCX0KCQoJcDpsYXN0LWNoaWxkIHsKCQltYXJnaW4tYm90dG9tOiAwOwoJfQoJCgkucmVwbGllcyA+ICo6OmJlZm9yZSB7CgkJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJCXdpZHRoOiAyMXB4OwoJCWhlaWdodDogMjFweDsKCQlwYWRkaW5nOiA0LjVweDsKCQliYWNrZ3JvdW5kOiAjMTBhMzdmOwoJCWJvcmRlci1yYWRpdXM6IDJweDsKCQlwb3NpdGlvbjogYWJzb2x1dGU7CgkJLyogdGhlIHNhbWUgdG9wIHBhZGRpbmcgYXMgYC5yZXBsaWVzID4gKmAgKi8KCQltYXJnaW4tdG9wOiAyNHB4OwoJCXRvcDogMDsKCQkvKiBzbGlnaHRseSBsZXNzIHRoYW4gaGFsZiB0aGUgc2lkZSBwYWRkaW5nCgkJb2YgYC5yZXBsaWVzID4gKmAgKi8KCQlsZWZ0OiA4cmVtOwoJCWNvbnRlbnQ6ICcnOwoJfQoJCgkucmVwbGllcyA+IC51c2VyOjpiZWZvcmUgewoJCWRpc3BsYXk6IGlubGluZS1mbGV4OwoJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CgkJYmFja2dyb3VuZDogIzAwODhjZjsKCQljb250ZW50OiAnSyc7CgkJZm9udC1zaXplOiAxLjFyZW07Cgl9CgkKCS5yZXBsaWVzID4gLmdwdDo6YmVmb3JlIHsKCQljb250ZW50OiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgdmlld0JveD0iMCAwIDQxIDQxIiBzdHJva2VXaWR0aD0iMS41IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zNy41MzI0IDE2Ljg3MDdDMzcuOTgwOCAxNS41MjQxIDM4LjEzNjMgMTQuMDk3NCAzNy45ODg2IDEyLjY4NTlDMzcuODQwOSAxMS4yNzQ0IDM3LjM5MzQgOS45MTA3NiAzNi42NzYgOC42ODYyMkMzNS42MTI2IDYuODM0MDQgMzMuOTg4MiA1LjM2NzYgMzIuMDM3MyA0LjQ5ODVDMzAuMDg2NCAzLjYyOTQxIDI3LjkwOTggMy40MDI1OSAyNS44MjE1IDMuODUwNzhDMjQuODc5NiAyLjc4OTMgMjMuNzIxOSAxLjk0MTI1IDIyLjQyNTcgMS4zNjM0MUMyMS4xMjk1IDAuNzg1NTc1IDE5LjcyNDkgMC40OTEyNjkgMTguMzA1OCAwLjUwMDE5N0MxNi4xNzA4IDAuNDk1MDQ0IDE0LjA4OTMgMS4xNjgwMyAxMi4zNjE0IDIuNDIyMTRDMTAuNjMzNSAzLjY3NjI0IDkuMzQ4NTMgNS40NDY2NiA4LjY5MTcgNy40NzgxNUM3LjMwMDg1IDcuNzYyODYgNS45ODY4NiA4LjM0MTQgNC44Mzc3IDkuMTc1MDVDMy42ODg1NCAxMC4wMDg3IDIuNzMwNzMgMTEuMDc4MiAyLjAyODM5IDEyLjMxMkMwLjk1NjQ2NCAxNC4xNTkxIDAuNDk4OTA1IDE2LjI5ODggMC43MjE2OTggMTguNDIyOEMwLjk0NDQ5MiAyMC41NDY3IDEuODM2MTIgMjIuNTQ0OSAzLjI2OCAyNC4xMjkzQzIuODE5NjYgMjUuNDc1OSAyLjY2NDEzIDI2LjkwMjYgMi44MTE4MiAyOC4zMTQxQzIuOTU5NTEgMjkuNzI1NiAzLjQwNzAxIDMxLjA4OTIgNC4xMjQzNyAzMi4zMTM4QzUuMTg3OTEgMzQuMTY1OSA2LjgxMjMgMzUuNjMyMiA4Ljc2MzIxIDM2LjUwMTNDMTAuNzE0MSAzNy4zNzA0IDEyLjg5MDcgMzcuNTk3MyAxNC45Nzg5IDM3LjE0OTJDMTUuOTIwOCAzOC4yMTA3IDE3LjA3ODYgMzkuMDU4NyAxOC4zNzQ3IDM5LjYzNjZDMTkuNjcwOSA0MC4yMTQ0IDIxLjA3NTUgNDAuNTA4NyAyMi40OTQ2IDQwLjQ5OThDMjQuNjMwNyA0MC41MDU0IDI2LjcxMzMgMzkuODMyMSAyOC40NDE4IDM4LjU3NzJDMzAuMTcwNCAzNy4zMjIzIDMxLjQ1NTYgMzUuNTUwNiAzMi4xMTE5IDMzLjUxNzlDMzMuNTAyNyAzMy4yMzMyIDM0LjgxNjcgMzIuNjU0NyAzNS45NjU5IDMxLjgyMUMzNy4xMTUgMzAuOTg3NCAzOC4wNzI4IDI5LjkxNzggMzguNzc1MiAyOC42ODRDMzkuODQ1OCAyNi44MzcxIDQwLjMwMjMgMjQuNjk3OSA0MC4wNzg5IDIyLjU3NDhDMzkuODU1NiAyMC40NTE3IDM4Ljk2MzkgMTguNDU0NCAzNy41MzI0IDE2Ljg3MDdaTTIyLjQ5NzggMzcuODg0OUMyMC43NDQzIDM3Ljg4NzQgMTkuMDQ1OSAzNy4yNzMzIDE3LjY5OTQgMzYuMTUwMUMxNy43NjAxIDM2LjExNyAxNy44NjY2IDM2LjA1ODYgMTcuOTM2IDM2LjAxNjFMMjUuOTAwNCAzMS40MTU2QzI2LjEwMDMgMzEuMzAxOSAyNi4yNjYzIDMxLjEzNyAyNi4zODEzIDMwLjkzNzhDMjYuNDk2NCAzMC43Mzg2IDI2LjU1NjMgMzAuNTEyNCAyNi41NTQ5IDMwLjI4MjVWMTkuMDU0MkwyOS45MjEzIDIwLjk5OEMyOS45Mzg5IDIxLjAwNjggMjkuOTU0MSAyMS4wMTk4IDI5Ljk2NTYgMjEuMDM1OUMyOS45NzcgMjEuMDUyIDI5Ljk4NDIgMjEuMDcwNyAyOS45ODY3IDIxLjA5MDJWMzAuMzg4OUMyOS45ODQyIDMyLjM3NSAyOS4xOTQ2IDM0LjI3OTEgMjcuNzkwOSAzNS42ODQxQzI2LjM4NzIgMzcuMDg5MiAyNC40ODM4IDM3Ljg4MDYgMjIuNDk3OCAzNy44ODQ5Wk02LjM5MjI3IDMxLjAwNjRDNS41MTM5NyAyOS40ODg4IDUuMTk3NDIgMjcuNzEwNyA1LjQ5ODA0IDI1Ljk4MzJDNS41NTcxOCAyNi4wMTg3IDUuNjYwNDggMjYuMDgxOCA1LjczNDYxIDI2LjEyNDRMMTMuNjk5IDMwLjcyNDhDMTMuODk3NSAzMC44NDA4IDE0LjEyMzMgMzAuOTAyIDE0LjM1MzIgMzAuOTAyQzE0LjU4MyAzMC45MDIgMTQuODA4OCAzMC44NDA4IDE1LjAwNzMgMzAuNzI0OEwyNC43MzEgMjUuMTEwM1YyOC45OTc5QzI0LjczMjEgMjkuMDE3NyAyNC43MjgzIDI5LjAzNzYgMjQuNzE5OSAyOS4wNTU2QzI0LjcxMTUgMjkuMDczNiAyNC42OTg4IDI5LjA4OTMgMjQuNjgyOSAyOS4xMDEyTDE2LjYzMTcgMzMuNzQ5N0MxNC45MDk2IDM0Ljc0MTYgMTIuODY0MyAzNS4wMDk3IDEwLjk0NDcgMzQuNDk1NEM5LjAyNTA2IDMzLjk4MTEgNy4zODc4NSAzMi43MjYzIDYuMzkyMjcgMzEuMDA2NFpNNC4yOTcwNyAxMy42MTk0QzUuMTcxNTYgMTIuMDk5OCA2LjU1Mjc5IDEwLjkzNjQgOC4xOTg4NSAxMC4zMzI3QzguMTk4ODUgMTAuNDAxMyA4LjE5NDkxIDEwLjUyMjggOC4xOTQ5MSAxMC42MDcxVjE5LjgwOEM4LjE5MzUxIDIwLjAzNzggOC4yNTMzNCAyMC4yNjM4IDguMzY4MjMgMjAuNDYyOUM4LjQ4MzEyIDIwLjY2MTkgOC42NDg5MyAyMC44MjY3IDguODQ4NjMgMjAuOTQwNEwxOC41NzIzIDI2LjU1NDJMMTUuMjA2IDI4LjQ5NzlDMTUuMTg5NCAyOC41MDg5IDE1LjE3MDMgMjguNTE1NSAxNS4xNTA1IDI4LjUxNzNDMTUuMTMwNyAyOC41MTkxIDE1LjExMDcgMjguNTE2IDE1LjA5MjQgMjguNTA4Mkw3LjA0MDQ2IDIzLjg1NTdDNS4zMjEzNSAyMi44NjAxIDQuMDY3MTYgMjEuMjIzNSAzLjU1Mjg5IDE5LjMwNDZDMy4wMzg2MiAxNy4zODU4IDMuMzA2MjQgMTUuMzQxMyA0LjI5NzA3IDEzLjYxOTRaTTMxLjk1NSAyMC4wNTU2TDIyLjIzMTIgMTQuNDQxMUwyNS41OTc2IDEyLjQ5ODFDMjUuNjE0MiAxMi40ODcyIDI1LjYzMzMgMTIuNDgwNSAyNS42NTMxIDEyLjQ3ODdDMjUuNjcyOSAxMi40NzY5IDI1LjY5MjggMTIuNDgwMSAyNS43MTExIDEyLjQ4NzlMMzMuNzYzMSAxNy4xMzY0QzM0Ljk5NjcgMTcuODQ5IDM2LjAwMTcgMTguODk4MiAzNi42NjA2IDIwLjE2MTNDMzcuMzE5NCAyMS40MjQ0IDM3LjYwNDcgMjIuODQ5IDM3LjQ4MzIgMjQuMjY4NEMzNy4zNjE3IDI1LjY4NzggMzYuODM4MiAyNy4wNDMyIDM1Ljk3NDMgMjguMTc1OUMzNS4xMTAzIDI5LjMwODYgMzMuOTQxNSAzMC4xNzE3IDMyLjYwNDcgMzAuNjY0MUMzMi42MDQ3IDMwLjU5NDcgMzIuNjA0NyAzMC40NzMzIDMyLjYwNDcgMzAuMzg4OVYyMS4xODhDMzIuNjA2NiAyMC45NTg2IDMyLjU0NzQgMjAuNzMyOCAzMi40MzMyIDIwLjUzMzhDMzIuMzE5IDIwLjMzNDggMzIuMTU0IDIwLjE2OTggMzEuOTU1IDIwLjA1NTZaTTM1LjMwNTUgMTUuMDEyOEMzNS4yNDY0IDE0Ljk3NjUgMzUuMTQzMSAxNC45MTQyIDM1LjA2OSAxNC44NzE3TDI3LjEwNDUgMTAuMjcxMkMyNi45MDYgMTAuMTU1NCAyNi42ODAzIDEwLjA5NDMgMjYuNDUwNCAxMC4wOTQzQzI2LjIyMDYgMTAuMDk0MyAyNS45OTQ4IDEwLjE1NTQgMjUuNzk2MyAxMC4yNzEyTDE2LjA3MjYgMTUuODg1OFYxMS45OTgyQzE2LjA3MTUgMTEuOTc4MyAxNi4wNzUzIDExLjk1ODUgMTYuMDgzNyAxMS45NDA1QzE2LjA5MjEgMTEuOTIyNSAxNi4xMDQ4IDExLjkwNjggMTYuMTIwNyAxMS44OTQ5TDI0LjE3MTkgNy4yNTAyNUMyNS40MDUzIDYuNTM5MDMgMjYuODE1OCA2LjE5Mzc2IDI4LjIzODMgNi4yNTQ4MkMyOS42NjA4IDYuMzE1ODkgMzEuMDM2NCA2Ljc4MDc3IDMyLjIwNDQgNy41OTUwOEMzMy4zNzIzIDguNDA5MzkgMzQuMjg0MiA5LjUzOTQ1IDM0LjgzMzQgMTAuODUzMUMzNS4zODI2IDEyLjE2NjcgMzUuNTQ2NCAxMy42MDk1IDM1LjMwNTUgMTUuMDEyOFpNMTQuMjQyNCAyMS45NDE5TDEwLjg3NTIgMTkuOTk4MUMxMC44NTc2IDE5Ljk4OTMgMTAuODQyMyAxOS45NzYzIDEwLjgzMDkgMTkuOTYwMkMxMC44MTk1IDE5Ljk0NDEgMTAuODEyMiAxOS45MjU0IDEwLjgwOTggMTkuOTA1OFYxMC42MDcxQzEwLjgxMDcgOS4xODI5NSAxMS4yMTczIDcuNzg4NDggMTEuOTgxOSA2LjU4Njk2QzEyLjc0NjYgNS4zODU0NCAxMy44Mzc3IDQuNDI2NTkgMTUuMTI3NSAzLjgyMjY0QzE2LjQxNzMgMy4yMTg2OSAxNy44NTI0IDIuOTk0NjQgMTkuMjY0OSAzLjE3NjdDMjAuNjc3NSAzLjM1ODc2IDIyLjAwODkgMy45Mzk0MSAyMy4xMDM0IDQuODUwNjdDMjMuMDQyNyA0Ljg4Mzc5IDIyLjkzNyA0Ljk0MjE1IDIyLjg2NjggNC45ODQ3M0wxNC45MDI0IDkuNTg1MTdDMTQuNzAyNSA5LjY5ODc4IDE0LjUzNjYgOS44NjM1NiAxNC40MjE1IDEwLjA2MjZDMTQuMzA2NSAxMC4yNjE2IDE0LjI0NjYgMTAuNDg3NyAxNC4yNDc5IDEwLjcxNzVMMTQuMjQyNCAyMS45NDE5Wk0xNi4wNzEgMTcuOTk5MUwyMC40MDE4IDE1LjQ5NzhMMjQuNzMyNSAxNy45OTc1VjIyLjk5ODVMMjAuNDAxOCAyNS40OTgzTDE2LjA3MSAyMi45OTg1VjE3Ljk5OTFaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPjwvc3ZnPicpOwoJfQoJCgkudW5kZXJsaW5lIHsKCQl0ZXh0LWRlY29yYXRpb24tbGluZTogdW5kZXJsaW5lOwoJfQoJYSB7CgkJY29sb3I6IGluaGVyaXQ7CgkJdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0OwoJfQoJCgkuYmctYmxhY2sgewoJCWJhY2tncm91bmQ6ICMwMDA7Cgl9CgkKCS5iZy1ncmF5LTgwMCB7CgkJYmFja2dyb3VuZDogcmdiYSg1Miw1Myw2NSk7Cgl9CgkKCS50ZXh0LWdyYXktMjAwIHsKCQljb2xvcjogcmdiYSgyMTcsMjE3LDIyNyk7Cgl9CgkKCS5weS0yIHsKCQlwYWRkaW5nLWJvdHRvbTogMC41cmVtOwoJCXBhZGRpbmctdG9wOiAwLjVyZW07Cgl9CgkKCS5weC0zIHsKCQlwYWRkaW5nLWxlZnQ6IDAuNzVyZW07CgkJcGFkZGluZy1yaWdodDogMC43NXJlbTsKCX0KCgkucHgtNCB7CgkJcGFkZGluZy1sZWZ0OiAxcmVtOwoJCXBhZGRpbmctcmlnaHQ6IDFyZW07Cgl9CgoJLnRleHQteHMgewoJCWZvbnQtc2l6ZTogLjc1cmVtOwoJCWxpbmUtaGVpZ2h0OiAxcmVtOwoJfQoKCS5mb250LXNhbnMgewoJCWZvbnQtZmFtaWx5OiBTw7ZobmUsdWktc2Fucy1zZXJpZixzeXN0ZW0tdWksLWFwcGxlLXN5c3RlbSxTZWdvZSBVSSxSb2JvdG8sVWJ1bnR1LENhbnRhcmVsbCxOb3RvIFNhbnMsc2Fucy1zZXJpZixIZWx2ZXRpY2EgTmV1ZSxBcmlhbCxBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxTZWdvZSBVSSBTeW1ib2wsTm90byBDb2xvciBFbW9qaTsKCX0KCQoJW3R5cGU9YnV0dG9uXSwgW3R5cGU9cmVzZXRdLCBbdHlwZT1zdWJtaXRdLCBidXR0b24gewoJCWRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKCQktd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsKCQliYWNrZ3JvdW5kLWltYWdlOiBub25lOwoJCWJvcmRlcjogMCBzb2xpZCAjZDlkOWUzOwoJCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CgkJY29sb3I6IGluaGVyaXQ7Cgl9CgkKCS5nYXAtMiB7CgkJZ2FwOiAwLjVyZW07Cgl9CgkKCS5wLTQgewoJCXBhZGRpbmc6IDFyZW07Cgl9CgkKCS5mbGV4IHsKCQlkaXNwbGF5OiBmbGV4OwoJfQoJCgkubWwtYXV0byB7CgkJbWFyZ2luLWxlZnQ6IGF1dG87Cgl9CgkKCS50ZXh0LXNtIHsKCQlmb250LXNpemU6IC44NzVyZW07CgkJbGluZS1oZWlnaHQ6IDEuMjVyZW07Cgl9CgoJLmJnLW9yYW5nZS01MDBcLzEwIHsKCQliYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIyNCwxMDgsNDMsLjEpOwoJCWNvbG9yOiAjZmZmOwoJfQoKCS5ib3JkZXItb3JhbmdlLTUwMCB7CgkJYm9yZGVyOiAxcHggc29saWQgcmdiYSgyMjQsMTA4LDQzKTsKCX0KCS5ib3JkZXIgewoJCWJvcmRlci13aWR0aDogMXB4OwoJfQoJLnJvdW5kZWQtbWQgewoJCWJvcmRlci1yYWRpdXM6IDAuMzc1cmVtOwoJfQoJCgkudGV4dC1vcmFuZ2UtNTAwIHsKCQljb2xvcjogcmdiYSgyMjQsMTA4LDQzKTsKCX0KCTwvc3R5bGU+Cgk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLmhsanMtY29tbWVudHsKCQljb2xvcjpoc2xhKDAsMCUsMTAwJSwuNSkKCX0KCS5obGpzLW1ldGF7CgkJY29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpCgl9CgkuaGxqcy1idWlsdF9pbiwuaGxqcy1jbGFzcyAuaGxqcy10aXRsZXsKCQljb2xvcjojZTk5NTBjCgl9CgkuaGxqcy1kb2N0YWcsLmhsanMtZm9ybXVsYSwuaGxqcy1rZXl3b3JkLC5obGpzLWxpdGVyYWx7CgkJY29sb3I6IzJlOTVkMwoJfQoJLmhsanMtYWRkaXRpb24sLmhsanMtYXR0cmlidXRlLC5obGpzLW1ldGEtc3RyaW5nLC5obGpzLXJlZ2V4cCwuaGxqcy1zdHJpbmd7CgkJY29sb3I6IzAwYTY3ZAoJfQoJLmhsanMtYXR0ciwuaGxqcy1udW1iZXIsLmhsanMtc2VsZWN0b3ItYXR0ciwuaGxqcy1zZWxlY3Rvci1jbGFzcywuaGxqcy1zZWxlY3Rvci1wc2V1ZG8sLmhsanMtdGVtcGxhdGUtdmFyaWFibGUsLmhsanMtdHlwZSwuaGxqcy12YXJpYWJsZXsKCQljb2xvcjojZGYzMDc5Cgl9CgkuaGxqcy1idWxsZXQsLmhsanMtbGluaywuaGxqcy1zZWxlY3Rvci1pZCwuaGxqcy1zeW1ib2wsLmhsanMtdGl0bGV7CgkJY29sb3I6I2YyMmMzZAoJfQoJLnRva2VuLmNkYXRhLC50b2tlbi5jb21tZW50LC50b2tlbi5kb2N0eXBlLC50b2tlbi5wcm9sb2d7CgkJY29sb3I6I2E5YWVjMQoJfQoJLnRva2VuLnB1bmN0dWF0aW9uewoJCWNvbG9yOiNmZWZlZmUKCX0KCS50b2tlbi5jb25zdGFudCwudG9rZW4uZGVsZXRlZCwudG9rZW4ucHJvcGVydHksLnRva2VuLnN5bWJvbCwudG9rZW4udGFnewoJCWNvbG9yOiNmZmEwN2EKCX0KCS50b2tlbi5ib29sZWFuLC50b2tlbi5udW1iZXJ7CgkJY29sb3I6IzAwZTBlMAoJfQoJLnRva2VuLmF0dHItbmFtZSwudG9rZW4uYnVpbHRpbiwudG9rZW4uY2hhciwudG9rZW4uaW5zZXJ0ZWQsLnRva2VuLnNlbGVjdG9yLC50b2tlbi5zdHJpbmd7CgkJY29sb3I6I2FiZTMzOAoJfQoJLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLC5zdHlsZSAudG9rZW4uc3RyaW5nLC50b2tlbi5lbnRpdHksLnRva2VuLm9wZXJhdG9yLC50b2tlbi51cmwsLnRva2VuLnZhcmlhYmxlewoJCWNvbG9yOiMwMGUwZTAKCX0KCS50b2tlbi5hdHJ1bGUsLnRva2VuLmF0dHItdmFsdWUsLnRva2VuLmZ1bmN0aW9uewoJCWNvbG9yOmdvbGQKCX0KCS50b2tlbi5rZXl3b3JkewoJCWNvbG9yOiMwMGUwZTAKCX0KCS50b2tlbi5pbXBvcnRhbnQsLnRva2VuLnJlZ2V4ewoJCWNvbG9yOmdvbGQKCX0KCS50b2tlbi5ib2xkLC50b2tlbi5pbXBvcnRhbnR7CgkJZm9udC13ZWlnaHQ6NzAwCgl9CgkudG9rZW4uaXRhbGljewoJCWZvbnQtc3R5bGU6aXRhbGljCgl9CgkudG9rZW4uZW50aXR5ewoJCWN1cnNvcjpoZWxwCgl9CglAbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsKCQljb2RlW2NsYXNzKj1sYW5ndWFnZS1dLHByZVtjbGFzcyo9bGFuZ3VhZ2UtXXsKCQkJYmFja2dyb3VuZDp3aW5kb3c7CgkJCWNvbG9yOndpbmRvd1RleHQKCQl9CgkJOm5vdChwcmUpPmNvZGVbY2xhc3MqPWxhbmd1YWdlLV0scHJlW2NsYXNzKj1sYW5ndWFnZS1dewoJCQliYWNrZ3JvdW5kOndpbmRvdwoJCX0KCQkudG9rZW4uaW1wb3J0YW50ewoJCQliYWNrZ3JvdW5kOmhpZ2hsaWdodDsKCQkJY29sb3I6d2luZG93OwoJCQlmb250LXdlaWdodDo0MDAKCQl9CgkJLnRva2VuLmF0cnVsZSwudG9rZW4uYXR0ci12YWx1ZSwudG9rZW4uZnVuY3Rpb24sLnRva2VuLmtleXdvcmQsLnRva2VuLm9wZXJhdG9yLC50b2tlbi5zZWxlY3RvcnsKCQkJZm9udC13ZWlnaHQ6NzAwCgkJfQoJCS50b2tlbi5hdHRyLXZhbHVlLC50b2tlbi5jb21tZW50LC50b2tlbi5kb2N0eXBlLC50b2tlbi5mdW5jdGlvbiwudG9rZW4ua2V5d29yZCwudG9rZW4ub3BlcmF0b3IsLnRva2VuLnByb3BlcnR5LC50b2tlbi5zdHJpbmd7CgkJCWNvbG9yOmhpZ2hsaWdodAoJCX0KCQkudG9rZW4uYXR0ci12YWx1ZSwudG9rZW4udXJsewoJCQlmb250LXdlaWdodDo0MDAKCQl9Cgl9Cgk8L3N0eWxlPgogIDwvaGVhZD4KICA8Ym9keT4KCTxkaXYgY2xhc3M9InJlcGxpZXMiPgoJCTwhLS0gSU5TRVJUIEhFUkUgLS0+Cgk8L2Rpdj4KICA8L2JvZHk+CjwvaHRtbD4=`);
    const HTML_MARKER = `<!-- INSERT HERE -->`;

	async function sha1Hash(stringToHash) {
		const encoder = new TextEncoder();
		const dataToHash = encoder.encode(stringToHash);

		const crypto = window.crypto || window.msCrypto; // for IE 11
		const subtle = crypto.subtle;
		const hashAlgorithm = "SHA-1";

		const hashedData = await subtle.digest(hashAlgorithm, dataToHash);

		// Convert the hashed data to a hexadecimal string
		const hashedHexString = Array.from(new Uint8Array(hashedData))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		return hashedHexString;
	}

	function makeHTML(contents) {
		return HTML_TEMPLATE.replace(HTML_MARKER, contents);
	}

    // replace videos
    const callback = function(mutationsList, observer) {
		const nav = document.querySelector("nav");

        if(Array.from(nav.querySelectorAll("#custom_save_button")).length > 0)
            return;

		const el = nav.lastElementChild.cloneNode(false);
        el.id = 'custom_save_button';
		el.innerHTML = "Save Chat";

		el.onclick = async function() {
			const a = document.createElement('a');
            let first = null;
			const contents = Array.from(document.querySelectorAll(".text-base")).map(
				item => {
                    const isGPT = Array.from(item.querySelectorAll('button.rounded-md')).length >= 2;
					//const isGPT = item.querySelector(`div[class^="request-"]`) !== null
					const contents = item.querySelector(`.items-start`)

					if(contents === null) {
						return null;
                    }

                    if(first === null) {
                        first = contents.innerText;
                    }

                    let color = window.getComputedStyle(item.querySelector(`.markdown`) || item, null).getPropertyValue("color");

                    if(color.length > 0) {
                        color = `color: ${color}`;
                    }

					return `<div class="${isGPT ? "gpt" : "user"}" style="${color}">${contents.innerHTML}</div>`
				}
			);

            if(first === null) {
                alert("Failed to get text for all items, check your CSS selector :(");
                return;
            }

			a.href = URL.createObjectURL(new Blob([makeHTML(contents.join("\n"))], {
				type: 'text/html'
			}));
            const hash = await sha1Hash(first);
			a.download = `gpt_${hash}.html`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(a.href);
		}

		nav.appendChild(el);
    };

    window.addEventListener('load', (event) => {
        const observer = new MutationObserver(callback);
        observer.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });
    });
})();
