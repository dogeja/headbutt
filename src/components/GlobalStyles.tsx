"use client";

export function GlobalStyles() {
  return (
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #008080;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFUSURBVGhD7ZJBDoMgEEWZ6NILlN6oN+LYrQfw2HgOYIXGGCIwTBkYJP+RX1hgmPcqoiiKojRhH7h/Hnu3i+ORTcswbMfx2w7+Xf1tGsYpV23DNkWvCbZQwDZoIW+LVqvI7YkWC0YKRQvFCgULxQsFCiUJBQklCwUI5QlpFsoVehXSJqQhpEVIS0iDkKaQ1C4kvTFK70LPC0nvohOFnoUSO+pMoUehTKFnoQKh6NNWulDpGUq5ojXnqVQoR6xdCBXKEesXSolBQqlivUJJMVgoJ9YnlB2DhXJj/4VKxCChktj/QiUxWKg09luoJrYECUnEvgtJxGChFrG2QtKxJVIo3FtISuyJEHreDEtIKvZ8Fw8h+SHIwrPQktirhQqE3i9UGvsUqhB6f3yUxl4Wqon1CdXE+oRqYn1CNbE+oZpYn1BNrE+oJtYnVBNFURTlR4zhArVc+uDQY7cKAAAAAElFTkSuQmCC");
        background-repeat: repeat;
      }
      @media (max-width: 640px) {
        body {
          overflow: auto;
        }
      }
      .window {
        height: auto !important;
        overflow: visible !important;
        max-height: none !important;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      }
      .window-header {
        background: linear-gradient(to right, #000080, #1084d0);
        color: white;
        font-weight: bold;
        padding: 3px 5px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      .window-controls {
        display: flex;
        gap: 2px;
      }
      .window-control {
        width: 16px;
        height: 14px;
        background-color: #c0c0c0;
        border: 1px solid;
        border-color: #dfdfdf #808080 #808080 #dfdfdf;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
      .window-content {
        height: auto !important;
        min-height: 0 !important;
        display: flex;
        flex-direction: column;
        overflow: visible !important;
        padding-bottom: 0 !important;
        background-color: #c0c0c0;
      }
      .window-content > div {
        margin-bottom: 0 !important;
      }
    `}</style>
  );
}
