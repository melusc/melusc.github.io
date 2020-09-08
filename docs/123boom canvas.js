{
  const canvas = document.getElementById('game-area');
  const ctx = canvas.getContext('2d');
  const color = 'white';
  let width;
  let height;

  let number = 1;

  let record = localStorage.getItem('record') ?? 1;

  let failedScreen = false;

  const update = () => {
    /* Clear only text */
    ctx.clearRect(width * 0.42 + 2, 0, width * 0.16 - 4, height);

    /* Current number */
    let fontSize = 60;
    ctx.font = `bold ${fontSize}px Quicksand`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;

    const availWidth = width * 0.16 * 0.9;
    while (ctx.measureText(number).width > availWidth) {
      fontSize--;
      ctx.font = `bold ${fontSize}px Quicksand`;
    }

    ctx.measureText(number);
    ctx.fillText(number, width / 2, (height + 60) / 2);

    /* Record */
    ctx.textBaseline = 'top';
    ctx.font = 'bold 30px Quicksand';
    ctx.fillText('Current best:', width / 2, height * 0.05);

    ctx.font = ' bold 30px Quicksand';
    ctx.fillText(record, width / 2, height * 0.05 + 30);
  };

  const init = () => {
    ctx.clearRect(0, 0, width, height);

    /* Left */
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.rect(width * 0.02, height * 0.05 + 60, width * 0.4, height * 0.9 - 60);
    ctx.stroke();
    ctx.closePath();

    /* Text */
    let fontSize = 60;
    ctx.font = `${fontSize}px Quicksand`;

    const availWidth = width * 0.4 * 0.9;

    while (
      Math.max(ctx.measureText('Boom').width, ctx.measureText('Safe').width) >
      availWidth
    ) {
      fontSize--;
      ctx.font = `${fontSize}px Quicksand`;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('Boom', width * 0.22, (height + 60) / 2);

    /* Right */
    ctx.beginPath();

    /* Same vals as above */
    ctx.rect(width * 0.58, height * 0.05 + 60, width * 0.4, height * 0.9 - 60);
    ctx.stroke();
    ctx.closePath();

    /* Text */
    /* Same vals as above */
    ctx.fillText('Safe', width * 0.78, (height + 60) / 2);

    update();
  };

  addEventListener('resize', () => {
    canvas.width = width = innerWidth;
    canvas.height = height = innerHeight;

    if (failedScreen === false) {
      init();
    } else if (failedScreen === true) {
      fail();
    }
  });

  const fail = () => {
    if (number > record) {
      record = number;

      localStorage.setItem('record', record);
    }

    failedScreen = true;

    ctx.clearRect(0, 0, width, height);

    /* Box */
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.rect(width * 0.15, height * 0.2, width * 0.7, height * 0.6);
    ctx.stroke();
    ctx.closePath();

    /* Text */
    ctx.font = '60px Quicksand';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('Restart?', width / 2, height / 2);
  };

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (failedScreen === false) {
      const isBoom = number % 7 === 0 || number % 3 === 0;

      if (
        x >= width * 0.02 &&
        x <= width * 0.42 &&
        y >= height * 0.05 + 60 &&
        y <= height * 0.95
      ) {
        if (isBoom) {
          number++;
          update();
        } else {
          fail();
        }
      } else if (
        x >= width * 0.58 &&
        x <= width * 0.98 &&
        y >= height * 0.05 + 60 &&
        y <= height * 0.95
      ) {
        if (!isBoom) {
          number++;
          update();
        } else {
          fail();
        }
      }
    } else {
      number = 1;
      failedScreen = false;
      init();
    }
  });

  canvas.width = width = innerWidth;
  canvas.height = height = innerHeight;

  new FontFace('Quicksand', 'url(fonts/Quicksand-VariableFont_wght.ttf)', {
    family: 'Quicksand',
    style: 'normal',
    weight: '200',
  })
    .load()
    .then(font_quicksand => {
      document.fonts.add(font_quicksand);
      init();
    });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      /* Left button */
      (failedScreen === false &&
        x >= width * 0.02 &&
        x <= width * 0.42 &&
        y >= height * 0.05 + 60 &&
        y <= height * 0.95) ||
      /* Right button */
      (failedScreen === false &&
        x >= width * 0.58 &&
        x <= width * 0.98 &&
        y >= height * 0.05 + 60 &&
        y <= height * 0.95) ||
      /* Restart button */
      (failedScreen === true &&
        x >= width * 0.15 &&
        x <= width * 0.85 &&
        y >= height * 0.2 &&
        y <= height * 0.8)
    ) {
      canvas.classList.add('pointer');
    } else {
      removePointer();
    }
  });

  const removePointer = () => void canvas.classList.remove('pointer');
  canvas.addEventListener('blur', removePointer);
  canvas.addEventListener('mouseleave', removePointer);
}
