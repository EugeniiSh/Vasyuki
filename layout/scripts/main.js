"use strict"

const nextSlide = (lineShift, sizeShift, numberElements, sliderVars, isPagination = false) =>
{
  if (sliderVars.position < numberElements * sizeShift)
  {
    sliderVars.position += sizeShift;

    if(isPagination)
    {
      sliderVars.index++;
    }     
  }  

  lineShift.style.left = -sliderVars.position + 'px';
};

const prevSlide = (lineShift, sizeShift, numberElements, sliderVars, isPagination = false) => 
{
  if (sliderVars.position > 0)
  {
    sliderVars.position -= sizeShift;

    if(isPagination)
    {
      sliderVars.index--;
    }
  }    
    
  lineShift.style.left = -sliderVars.position + 'px';   
};

const changePaginationDot = (dotElements, dotIndex, activeDotClass) =>
{
  for (let dot of dotElements)
  {
    dot.classList.remove(activeDotClass);
  }

  dotElements[dotIndex].classList.add(activeDotClass);
};   


function isLastSlide(slideLine, sizeShift, numberElements)
{
  return slideLine.style.left === 0 + 'px' || slideLine.style.left === -(sizeShift * numberElements) + 'px'; 
}



// Transformation slider
const transLine = document.querySelector('.transformation__description-blocks');
const transLeftArrow = document.querySelector('.transformation__pagination-blocks > .pagination-block__left-arrow');
const transRightArrow = document.querySelector('.transformation__pagination-blocks > .pagination-block__right-arrow');
const transPaginationDots = document.querySelectorAll('.transformation__pagination-blocks .dot-block');

const transVar =
{
  position: 0,
  index: 0,
}

transLeftArrow.addEventListener('click', (event) =>
{
  prevSlide(transLine, 355, transPaginationDots.length, transVar, true);
  changePaginationDot(transPaginationDots, transVar.index, 'active-dot');

  if(isLastSlide(transLine, 355, transPaginationDots.length - 1))
  {
    event.target.classList.add('disabled-arrow');
  }
  else
  {
    transLeftArrow.classList.remove('disabled-arrow');
    transRightArrow.classList.remove('disabled-arrow');
  }
});

transRightArrow.addEventListener('click', (event) =>
{
  nextSlide(transLine, 355, transPaginationDots.length - 1, transVar, true);
  changePaginationDot(transPaginationDots, transVar.index, 'active-dot');

  if(isLastSlide(transLine, 355, transPaginationDots.length - 1))
  {
    event.target.classList.add('disabled-arrow');
  }
  else
  {
    transLeftArrow.classList.remove('disabled-arrow');
    transRightArrow.classList.remove('disabled-arrow');
  }
});

transPaginationDots.forEach((item, index) =>
{
  item.addEventListener('click', () =>
  {
    transVar.position = index * 355;
    transLine.style.left = -transVar.position + 'px';
    transVar.index = index;
    changePaginationDot(transPaginationDots, transVar.index, 'active-dot');

    transLeftArrow.classList.remove('disabled-arrow');
    transRightArrow.classList.remove('disabled-arrow');

    if(isLastSlide(transLine, 355, transPaginationDots.length - 1))
    {
      if(index === transPaginationDots.length - 1)
      {
        transRightArrow.classList.add('disabled-arrow');
      }
      else
      {
        transLeftArrow.classList.add('disabled-arrow');
      }
    }
  });
});



// Members Slider
const membersSliderLine = document.querySelector('.members__slider-block > .slider-line');
const membersElements = membersSliderLine.querySelectorAll('.slider-line__item-block');

const membersPagination = document.querySelector('.members__pagination-blocks')
const membersLeftArrow = membersPagination.querySelector('.pagination-block__left-arrow');
const membersRightArrow = membersPagination.querySelector('.pagination-block__right-arrow');

const membersVar =
{
  position: 0,
  index: 0,
}

membersLeftArrow.addEventListener('click', () => 
{
  const membersNumbers = membersPagination.querySelector('.numbers-block');
  const membersSliderBlock = document.querySelector('.members__slider-block');

  const membersSliderItemBlockWidth = parseFloat(getComputedStyle(membersElements[0]).width);
  const membersSliderGap = parseInt(getComputedStyle(membersSliderLine).gap);
  const visibleBlockNumber = parseInt(parseFloat(getComputedStyle(membersSliderBlock).width) / membersSliderItemBlockWidth);

  let currentSlideValue = parseInt(membersNumbers.textContent);
  
  if(currentSlideValue > visibleBlockNumber)
  {
    prevSlide(membersSliderLine, membersSliderItemBlockWidth + membersSliderGap, membersElements.length - 1, membersVar);
    currentSlideValue--;
    membersNumbers.textContent = `${currentSlideValue} / 6`;
  }
  else
  {
    membersVar.position = (membersSliderItemBlockWidth + membersSliderGap) * (membersElements.length - visibleBlockNumber);
    membersSliderLine.style.left = -membersVar.position + 'px';
    membersNumbers.textContent = `${membersElements.length} / 6`;
  }
  
});

membersRightArrow.addEventListener('click', () => 
{
  const membersNumbers = membersPagination.querySelector('.numbers-block');
  const membersSliderBlock = document.querySelector('.members__slider-block');

  const membersSliderItemBlockWidth = parseFloat(getComputedStyle(membersElements[0]).width);
  const membersSliderGap = parseInt(getComputedStyle(membersSliderLine).gap);
  const visibleBlockNumber = parseInt(parseFloat(getComputedStyle(membersSliderBlock).width) / membersSliderItemBlockWidth);

  let currentSlideValue = parseInt(membersNumbers.textContent);
  
  if(currentSlideValue < 6)
  {
    nextSlide(membersSliderLine, membersSliderItemBlockWidth + membersSliderGap, membersElements.length - 1, membersVar);
    currentSlideValue++;
    membersNumbers.textContent = `${currentSlideValue} / 6`;
  }
  else
  {
    membersVar.position = 0;
    membersSliderLine.style.left = -membersVar.position + 'px';
    membersNumbers.textContent = `${visibleBlockNumber} / 6`;
  }
});

setInterval(() => 
{
  const membersNumbers = membersPagination.querySelector('.numbers-block');
  const membersSliderBlock = document.querySelector('.members__slider-block');

  const membersSliderItemBlockWidth = parseFloat(getComputedStyle(membersElements[0]).width);
  const membersSliderGap = parseInt(getComputedStyle(membersSliderLine).gap);
  const visibleBlockNumber = parseInt(parseFloat(getComputedStyle(membersSliderBlock).width) / membersSliderItemBlockWidth);

  let currentSlideValue = parseInt(membersNumbers.textContent);
  
  if(currentSlideValue < 6)
  {
    nextSlide(membersSliderLine, membersSliderItemBlockWidth + membersSliderGap, membersElements.length - 1, membersVar);
    currentSlideValue++;
    membersNumbers.textContent = `${currentSlideValue} / 6`;
  }
  else
  {
    membersVar.position = 0;
    membersSliderLine.style.left = -membersVar.position + 'px';
    membersNumbers.textContent = `${visibleBlockNumber} / 6`;
  }
}, 4000);


window.addEventListener('resize',() => 
{
  const width = document.body.clientWidth;
  const membersNumbers = membersPagination.querySelector('.numbers-block');

  if(width < 1348)
  {   
    membersNumbers.textContent = `1 / 6`;
    membersSliderLine.style.left = 0;
  }
  else
  {
    membersNumbers.textContent = `3 / 6`;
    membersSliderLine.style.left = 0;
  }
});

