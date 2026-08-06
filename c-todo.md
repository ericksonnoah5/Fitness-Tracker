make a branch before you do anything

X med - make sure every page is mobile accessable (kiosk-only /dashboard + /dashboardv2 left as desktop displays on purpose, see README)
X high - fitness app ui changes (redesigned the katie/noah picker and the tracker page: icons, stat cards, nicer input row, empty state, back button)
X high - add to my terminal. make it fun, it should do a lot of commands make it do all sorts of stuff. add easter eggs. (expanded /noah's existing terminal: ls/cat virtual filesystem, history, sudo/rm/cd jokes, neofetch, matrix, atlas, joke, hint pointing at the hidden passkey easter egg; also fixed a dead "cat about.txt" case that could never match)
X high - add a login as the start of the project, make it secure, at root / (signed httpOnly session cookie + middleware gate on every real page/API route, logout button added on the hub)
X med - change some ui on katies website, it looks nice it just needs a little bit of love small ui changes
X low - the login on the fitness app needs removed and add just an option for either katie or noah
X low - remove dashboard and recipes as buttons

commit and push the new branch
