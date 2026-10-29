# Instagram Creator Toolkit v1.3.0

Chrome/Brave extension with a branded icon, free local caption templates and optional Google Trends RSS suggestions for India.

## Install/update on Windows
1. Extract the ZIP.
2. Open `brave://extensions` or `chrome://extensions`.
3. Remove the previous unpacked version (or use Load unpacked with this new folder).
4. Select the folder that directly contains `manifest.json` and `popup.html`.

## Safety design
- No Instagram login or password fields.
- No page-reading content script.
- No broad `tabs`, `activeTab`, or `storage` permission.
- Only optional network host access is Google Trends, called when the user clicks the trends button.
- Topic-based caption generation is local.
- No downloader, auto-posting, likes, comments, follows, or account creation.
- No remote JavaScript execution.

## Chrome Web Store publishing checklist
1. Use a developer account you control and can access long-term.
2. Register at the Chrome Web Store developer dashboard and pay the one-time registration fee shown by Google.
3. Test the extension in a clean Chrome profile. Confirm captions work offline and the trend button handles network errors.
4. Create store assets: 128×128 icon is included; prepare clear screenshots of the working extension UI and a concise, truthful description.
5. Upload a ZIP of the extension files (not a ZIP containing an extra parent folder). The ZIP should contain `manifest.json` at its root.
6. Complete the Store listing and privacy practices accurately. Do not claim “official Instagram”, guaranteed viral results, or that Google Trends means Instagram trends.
7. Provide a publicly accessible privacy-policy URL. `PRIVACY_POLICY.md` is a draft to publish on a site you control; replace the contact placeholder before submission.
8. Submit for review. Google makes the approval decision; no one can guarantee acceptance.

## Important notes
Google Trends indicates search interest, not confirmed Instagram hashtag popularity. The optional trends feature requires internet access. This extension does not guarantee reach or viral performance.
