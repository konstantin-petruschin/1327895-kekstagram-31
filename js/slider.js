const SCALE_STEP = 0.25;
const SCALE_MAX = 1;
const SCALE_MIN = 0.25;
const EFFECT_MAX_LEVEL = 100;

const uploadForm = document.querySelector('.img-upload__form');
const reduce = uploadForm.querySelector('.scale__control--smaller');
const increase = uploadForm.querySelector('.scale__control--bigger');

const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img'); // preview
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level'); // sliderContainer
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
effectLevelValue.value = EFFECT_MAX_LEVEL;
const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const effectLevelSlider = imgUploadWrapper.querySelector('.effect-level__slider'); // effectSlider
const effectRadio = uploadForm.querySelectorAll('.effects__radio');

let scale = 1;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const sliderOptionsSepia = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const sliderOptionsMarvin = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const sliderOptionsPhobos = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const sliderOptionsHeat = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const effects = {
  none: sliderOptionsHeat,
  chrome: sliderOptionsSepia,
  sepia: sliderOptionsSepia,
  marvin: sliderOptionsMarvin,
  phobos: sliderOptionsPhobos,
  heat: sliderOptionsHeat,
};

const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMarvineStyleFilter = (value) => `invert(${value}%)`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const StyleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvineStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter
};

const getSliderUpdate = (effect, sliderElement) => {
  sliderElement.noUiSlider.updateOptions(effects[effect]);
};

const resetFilter = () => {
  imgUploadPreview.style.filter = '';
  effectLevel.classList.add ('hidden');
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  effectRadio.forEach((item) => {
    if(item.checked) {
      if(item.value !== 'none') {
        effectLevel.classList.remove('hidden');
        imgUploadPreview.style.filter = StyleFilterByEffects[item.value](effectLevelValue.value);
      } else {
        resetFilter();
      }
    }
  });
});

const onEffectRadioButtonClick = (evt) => {
  const currentRadioButton = evt.target.closest('.effects__radio');
  if(currentRadioButton) {
    const effectButtonValue = currentRadioButton.value;
    getSliderUpdate(effectButtonValue, effectLevelSlider);
  }
};


const onReduceClick = () => {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    scaleControlValue.value = `${scale * 100}%`;
  }
};

const onIncreaseClick = () => {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    scaleControlValue.value = `${scale * 100}%`;
  }
};

reduce.addEventListener('click', onReduceClick);
increase.addEventListener('click', onIncreaseClick); // лучше change или оставить как есть?
effectRadio.forEach((radio) => radio.addEventListener('change', onEffectRadioButtonClick));
