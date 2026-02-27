const enums = {
  axis: [ 'HORIZONTAL', 'VERTICAL' ],
  range: [ 'OUTER', 'INNER' ],
  speed: [ 'FAST', 'NORMAL', 'SLOW', 'CUSTOM' ],
  delay: [ 'NONE', 'SHORT', 'LONG', 'CUSTOM' ],
  playback: [ 'REPEAT', 'BOUNCE', 'SINGLE', 'CUSTOM' ],
  direction: [ 'LEFT', 'RIGHT', 'UP', 'DOWN' ],
  hover: [ 'NONE', 'PLAY', 'PAUSE' ],
};

const axesDirsMap = new Map([
  ['HORIZONTAL', ['LEFT', 'RIGHT']],
  ['VERTICAL', ['UP', 'DOWN']]]);

const axesStylesMap = new Map([
  ['HORIZONTAL', 'width: calc(100% - 2); font-weight: bold;  background-color: yellow; margin: 1px; border: solid 1px black;'],
  ['VERTICAL', 'width: 33%; height: 369px; font-weight: bold;  background-color: yellow; margin: 1px; border: solid 1px black;'],
]);

function createTestLayout() {
  const controlPanel = document.createElement('div');
  controlPanel.id = "control_panel";
  controlPanel.className = "control-panel";
  document.body.appendChild(controlPanel);
  const demoContainer = document.createElement('div');
  demoContainer.id = "demo_container";
  demoContainer.className = "demo-container";
  document.body.appendChild(demoContainer);
  createControlPanel(controlPanel);
}

function createControlPanel(controlPanel) {
  controlPanel.innerHTML = '';
  controlPanel.appendChild(createTextareaControl('textInput', 'Marquee text...'));
  controlPanel.appendChild(createTextareaControl('styleInput', 'Marquee style...', axesStylesMap.get('HORIZONTAL')));
  controlPanel.appendChild(createEnumControl('axisSelect', 'Axis', enums.axis, "", onAxisChanged));
  controlPanel.appendChild(createEnumControl('directionSelect', 'Direction', enums.direction));
  controlPanel.appendChild(createEnumControl('rangeSelect', 'Range', enums.range));
  controlPanel.appendChild(createEnumControl('playbackSelect', 'Playback mode', enums.playback, '[times]'));
  controlPanel.appendChild(createEnumControl('delaySelect', 'Delay', enums.delay, '[sec]'));
  controlPanel.appendChild(createEnumControl('speedSelect', 'Speed', enums.speed, '[px/sec]'));
  controlPanel.appendChild(createEnumControl('hoverSelect', 'Hover behavior', enums.hover));
  controlPanel.appendChild(createSeparatorControl());
  controlPanel.appendChild(createButtonControl('createButton', 'CREATE MARQUEE', createMarquee));
  controlPanel.appendChild(createButtonControl('resetButton', 'RESET CONTROLS', resetControls));
  controlPanel.appendChild(createButtonControl('clearButton', 'CLEAR CONTENT', clearDemo));
  validateSelectOptions(document.getElementById('axisSelect'), document.getElementById('directionSelect'), axesDirsMap);
}

function onAxisChanged(e) {
  const select1 = document.getElementById('axisSelect');
  const select2 = document.getElementById('directionSelect');
  const styleTextInput = document.getElementById('styleInput');
  if (!styleTextInput.value
    || styleTextInput.value === axesStylesMap.get('HORIZONTAL')
    || styleTextInput.value === axesStylesMap.get('VERTICAL'))
      styleTextInput.value = axesStylesMap.get(select1.value);
  validateSelectOptions(document.getElementById('axisSelect'),
    document.getElementById('directionSelect'), axesDirsMap);
}

function validateSelectOptions(select1, select2, filterMap) {
  const value1 = select1.value;
  const value2 = select2.value;
  const allowedItems = filterMap.get(value1);

  let selected = false;
  if (allowedItems.includes(value2)) selected = true;
  for (let i = 0; i < select2.children.length; i++) {
    if (!allowedItems.includes(select2.children[i].value)) {
      select2.children[i].removeAttribute('selected');
      select2.children[i].setAttribute('disabled', 'disabled');
    }
    else {
      select2.children[i].removeAttribute('disabled');
      if (selected) continue;
      select2.children[i].setAttribute('selected', 'selected');
      selected = true;
    }
  }
}

function createMarquee() {
  const text = getText();
  if (!text) return;
  Marquee.create(
    text,
    document.getElementById('demo_container'),
    undefined,
    document.getElementById('styleInput').value,
    getOptions());
}

function getText() {
  const textInput = document.getElementById('textInput');
  const text = textInput.value;
  if (text.length === 0) {
    console.warn('Cannot create marquee for an empty text!');
    textInput.focus();
    return;
  }
  return text;
}

function getOptions() {
  return {
    axis: getEnumValue('axisSelect'),
    speed: getEnumValue('speedSelect'),
    delay: getEnumValue('delaySelect'),
    range: getEnumValue('rangeSelect'),
    hover: getEnumValue('hoverSelect'),
    playback: getEnumValue('playbackSelect'),
    direction: getEnumValue('directionSelect'),
  };
}

function getEnumValue(selectId) {
  const select = document.getElementById(selectId);
  const selectedValue = select.value;
  return selectedValue === 'CUSTOM'
    ? parseFloat(document.getElementById(selectId + 'Custom').value)
    : selectedValue;
}

function clearDemo() {
  document.getElementById('demo_container').innerHTML = '';
}

function resetControls() {
  document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
  document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
  document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
}

function createEnumControl(id, labelText, options, customValueInfo = "", onChange = undefined) {
  const label = document.createElement('label');
  label.innerHTML = `${labelText}<br/>`;
  const select = document.createElement('select');
  select.id = id;
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.innerText = option;
    select.appendChild(opt);
  });
  label.appendChild(select);

  if (!options.includes('CUSTOM')) {
    if (typeof onChange === "function")
      select.addEventListener('change', onChange);
    return label;
  }

  const customInput = document.createElement('input');
  customInput.type = 'number';
  customInput.id = `${id}Custom`;
  customInput.placeholder = `${customValueInfo}`;
  customInput.style.display = 'none';
  select.addEventListener('change', () => {
    customInput.style.display = select.value === 'CUSTOM' ? 'block' : 'none';
    if (typeof onChange === "function") onChange.call();
  });
  label.appendChild(customInput);

  return label;
}

function createAllowHtmlCheckbox() {
  const label = document.createElement('label');
  label.classList.add('allow-checkbox');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'allowHtmlCheckbox';
  label.appendChild(checkbox);
  label.innerHTML = label.children[0].outerHTML + "Allow HTML";
  return label;
}

function createTextareaControl(id, placeholderText = "", text = "") {
  const textLabel = document.createElement('label');
  const textArea = document.createElement('textarea');
  textArea.id = `${id}`;
  textArea.placeholder = `${placeholderText}`;
  textArea.value = text;
  textLabel.appendChild(textArea);
  return textLabel;
}

function createButtonControl(id, caption, onClick) {
const label = document.createElement('label');
const btn = document.createElement('button');
btn.id = `${id}`;
btn.innerText = caption;
if (typeof onClick === "function") btn.addEventListener('click', onClick);
label.appendChild(btn);
return label;
}

function createSeparatorControl() {
  const label = document.createElement('label');
  label.className = "separator-gap";
  return label;
}
