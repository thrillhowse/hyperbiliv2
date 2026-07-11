export const addCopyGraphBtnEL = async () => {
  const copyGraphBtn = document.querySelector('#copy-bili-graph');

  copyGraphBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      // Copy bili graph (canvas image)
      const canvas = document.querySelector('#bili-graph');
      if (canvas) {
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, 'image/png')
        );
        const clipboardItemInput = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([clipboardItemInput]);
      }

      copyGraphBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyGraphBtn.textContent = 'Copy Graph';
      }, 1500);
    } catch (err) {
      console.error('Failed to copy', err);
      copyGraphBtn.textContent = 'Error!';
      setTimeout(() => {
        copyGraphBtn.textContent = 'Copy Graph';
      }, 1500);
    }
  });
};
