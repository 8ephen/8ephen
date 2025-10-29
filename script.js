document.addEventListener('DOMContentLoaded', function() {
  var slider = document.getElementById('size-slider');
  var grid = document.getElementById('grid1');
  var sliderContainer = document.getElementById('slider-container');

  slider.addEventListener('input', function() {
    var itemsPerRow = parseInt(slider.value);
    var grid = document.getElementById('grid1');
    
    if (grid) {
      // Calculate width per item based on items per row
      // Account for gaps and padding to fit page width
      var gapSpace = 20; // 20px gap between items
      var totalGaps = (itemsPerRow - 1) * gapSpace;
      var containerPadding = 40; // 20px padding on each side
      var availableWidth = 100; // Use percentage for responsive design
      
      // Calculate item width as percentage
      var itemWidthPercent = (availableWidth - ((totalGaps + containerPadding) / window.innerWidth * 100)) / itemsPerRow;
      
      // Calculate model size based on available space
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      var availableWidthPx = (viewportWidth - containerPadding - totalGaps) / itemsPerRow;
      var modelSize = availableWidthPx * 0.9; // 90% of available space
      
      // Restrict model size to the smaller of vh or vw (converted to pixels)
      var maxSizeVh = viewportHeight * 0.9; // 90% of viewport height
      var maxSizeVw = viewportWidth * 0.9; // 90% of viewport width
      var maxAllowedSize = Math.min(maxSizeVh, maxSizeVw);
      
      // Ensure model doesn't exceed the smaller viewport dimension
      modelSize = Math.min(modelSize, maxAllowedSize);
      
      // Apply width to all grid items to control ROW layout
      var gridItems = grid.querySelectorAll('.grid-btn');
      gridItems.forEach(function(item) {
        item.style.flex = `0 0 ${itemWidthPercent}%`;
        item.style.width = `${itemWidthPercent}%`;
        item.style.maxWidth = `${itemWidthPercent}%`;
        item.style.minWidth = `${itemWidthPercent}%`;
        
        // Adjust model-viewer size based on columns
        var modelViewer = item.querySelector('model-viewer');
        if (modelViewer) {
          modelViewer.style.width = modelSize + 'px';
          modelViewer.style.height = modelSize + 'px';
          modelViewer.style.display = 'block';
          modelViewer.style.margin = '0 auto';
        }
      });
      
      console.log('Items per row:', itemsPerRow, 'Model size:', modelSize + 'px', 'Item width:', itemWidthPercent.toFixed(1) + '%');
    }
  });

  // Initialize grid layout on page load
  function initializeGrid() {
    var initialValue = parseInt(slider.value) || 3;
    var grid = document.getElementById('grid1');
    
    if (grid) {
      var gapSpace = 20;
      var totalGaps = (initialValue - 1) * gapSpace;
      var containerPadding = 40;
      var availableWidth = 100;
      var itemWidthPercent = (availableWidth - ((totalGaps + containerPadding) / window.innerWidth * 100)) / initialValue;
      
      // Calculate initial model size
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      var availableWidthPx = (viewportWidth - containerPadding - totalGaps) / initialValue;
      var modelSize = availableWidthPx * 0.9;
      
      // Restrict model size to the smaller of vh or vw (converted to pixels)
      var maxSizeVh = viewportHeight * 0.9; // 90% of viewport height
      var maxSizeVw = viewportWidth * 0.9; // 90% of viewport width
      var maxAllowedSize = Math.min(maxSizeVh, maxSizeVw);
      
      // Ensure model doesn't exceed the smaller viewport dimension
      modelSize = Math.min(modelSize, maxAllowedSize);
      
      var gridItems = grid.querySelectorAll('.grid-btn');
      gridItems.forEach(function(item) {
        item.style.flex = `0 0 ${itemWidthPercent}%`;
        item.style.width = `${itemWidthPercent}%`;
        item.style.maxWidth = `${itemWidthPercent}%`;
        item.style.minWidth = `${itemWidthPercent}%`;
        
        // Set initial model size
        var modelViewer = item.querySelector('model-viewer');
        if (modelViewer) {
          modelViewer.style.width = modelSize + 'px';
          modelViewer.style.height = modelSize + 'px';
          modelViewer.style.display = 'block';
          modelViewer.style.margin = '0 auto';
        }
      });
    }
  }

  // Initialize grid layout
  initializeGrid();

  // Recalculate layout on window resize
  window.addEventListener('resize', function() {
    // Trigger slider event to recalculate sizes
    slider.dispatchEvent(new Event('input'));
  });

  window.addEventListener('scroll', function() {
    if (!grid || !sliderContainer) return;
    var gridRect = grid.getBoundingClientRect();
    var programBar = document.getElementById('program-bar');
    var programKnowledge = document.querySelector('.programs-logo');
    // Show slider only if any part of the grid is in view
    if (gridRect.bottom > 0 && gridRect.top < window.innerHeight) {
      sliderContainer.style.display = 'block';
      if (programBar) programBar.style.display = 'none';
    } else {
      sliderContainer.style.display = 'none';
      // Show program bar only when Program Knowledge heading is in view
      if (programBar && programKnowledge) {
        var pkRect = programKnowledge.getBoundingClientRect();
        if (pkRect.top < window.innerHeight && pkRect.bottom > 0) {
          programBar.style.display = 'flex';
        } else {
          programBar.style.display = 'none';
        }
      }
    }
  });

  // Model selection functionality
  let selectedModel = null;
  let isExplainModeActive = false;
  let isAnimationReversed = false; // Track animation direction

  function initModelSelection() {
    const modelButtons = document.querySelectorAll('.grid-btn .button');

    modelButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Check if this button is already selected
        const isAlreadySelected = this.classList.contains('selected');
        
        // If already selected, don't do anything
        if (isAlreadySelected) {
          console.log('Model already selected, ignoring click');
          return;
        }
        
        // Remove selected class from previously selected model
        if (selectedModel) {
          selectedModel.classList.remove('selected');
        }
        
        // Select the new model
        this.classList.add('selected');
        selectedModel = this;
        
        // Get the selected model's grid button for scrolling
        const selectedGridBtn = this.closest('.grid-btn');
        
        // If explain mode is active, show explanation for the newly selected model
        if (isExplainModeActive) {
          const modelType = this.getAttribute('data-model');
          console.log('Explain mode active, switching to model:', modelType); // Debug log
          hideAllExplanations();
          showExplanation(modelType);
        } else {
          // If explain mode is not active, hide all explanations but still scroll to selected model
          hideAllExplanations();
          
          // Wait for any layout changes to complete, then scroll to the selected model
          setTimeout(() => {
            scrollSelectedModelToTop(selectedGridBtn);
          }, 100);
        }
      });
    });
  }

  function restructureGridForExplanation(modelType) {
    const grid = document.querySelector('.grid');
    const allGridItems = Array.from(grid.children);
    const selectedGridBtn = document.querySelector(`[data-model="${modelType}"]`).closest('.grid-btn');
    
    // Clear the grid
    grid.innerHTML = '';
    
    // Find the index of the selected item
    const selectedIndex = allGridItems.indexOf(selectedGridBtn);
    
    // Add items before the selected item
    for (let i = 0; i < selectedIndex; i++) {
      grid.appendChild(allGridItems[i]);
    }
    
    // Create a wrapper for the selected item to force its own row
    const rowWrapper = document.createElement('div');
    rowWrapper.style.width = '100%';
    rowWrapper.style.display = 'flex';
    rowWrapper.style.justifyContent = 'center';
    rowWrapper.style.margin = '30px 0';
    rowWrapper.classList.add('explanation-row-wrapper');
    
    // Style the selected item for full width
    selectedGridBtn.style.width = '100vw';
    selectedGridBtn.style.maxWidth = '100vw';
    rowWrapper.appendChild(selectedGridBtn);
    grid.appendChild(rowWrapper);
    
    // Add remaining items after the selected item
    for (let i = selectedIndex + 1; i < allGridItems.length; i++) {
      grid.appendChild(allGridItems[i]);
    }
    
    // Wait for the grid to re-arrange itself, then scroll the selected model to 20px below the top
    setTimeout(() => {
      scrollSelectedModelToTop(selectedGridBtn);
    }, 100); // Short delay to ensure DOM has updated
  }

  function restoreOriginalGrid() {
    const grid = document.querySelector('.grid');
    const wrapper = grid.querySelector('.explanation-row-wrapper');
    
    if (wrapper) {
      const selectedGridBtn = wrapper.querySelector('.grid-btn');
      // Reset styles
      selectedGridBtn.style.width = '';
      selectedGridBtn.style.maxWidth = '';
      
      // Remove wrapper and put item back in normal flow
      grid.insertBefore(selectedGridBtn, wrapper);
      wrapper.remove();
    }
  }

  function scrollSelectedModelToTop(selectedGridBtn) {
    if (selectedGridBtn) {
      const rect = selectedGridBtn.getBoundingClientRect();
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate the target scroll position: element's current position minus 20px from top
      const targetScrollTop = currentScrollTop + rect.top - 100;
      
      // Smooth scroll to the target position
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      
      console.log('Scrolling selected model to 20px below top of screen');
    }
  }
 
  function hideAllExplanations() {
    const allExplanations = document.querySelectorAll('.explanation-text');
    allExplanations.forEach(explanation => {
      explanation.style.display = 'none';
      explanation.classList.remove('show');
    });
    // Restore original grid structure
    restoreOriginalGrid();
  }

  function showExplanation(modelType) {
    console.log('Attempting to show explanation for:', modelType); // Debug log
    const explanationElement = document.getElementById(`explanation-${modelType}`);
    console.log('Found explanation element:', explanationElement); // Debug log
    if (explanationElement) {
      // Restructure grid first
      restructureGridForExplanation(modelType);
      
      explanationElement.style.display = 'block';
      // Trigger animation after display is set
      setTimeout(() => {
        explanationElement.classList.add('show');
      }, 10);
    } else {
      console.log('No explanation element found for:', modelType); // Debug log
    }
  }

  function hideExplanation(modelType) {
    const explanationElement = document.getElementById(`explanation-${modelType}`);
    if (explanationElement) {
      explanationElement.classList.remove('show');
      // Hide element after animation completes
      setTimeout(() => {
        explanationElement.style.display = 'none';
        // Restore original grid structure
        restoreOriginalGrid();
      }, 300);
    }
  }

  function initExplainButton() {
    const explainButton = document.getElementById('explain-it-btn');
    
    explainButton.addEventListener('click', function() {
      if (!selectedModel) {
        // No model selected, maybe show a tooltip or alert
       
        return;
      }

      if (isExplainModeActive) {
        // Turn off explain mode - hide all explanations
        hideAllExplanations();
        isExplainModeActive = false;
        // Optional: Change button appearance to show it's inactive
        explainButton.style.background = '';
      } else {
        // Turn on explain mode - show explanation for currently selected model
        isExplainModeActive = true;
        const modelType = selectedModel.getAttribute('data-model');
        hideAllExplanations();
        showExplanation(modelType);
        // Optional: Change button appearance to show it's active/*
        //explainButton.style.background = '#e3f2fd';
        
      }
    });
  }

  // Function to trigger animation for the brewer model
  function triggerBrewerAnimation() {
    if (selectedModel && selectedModel.getAttribute('data-model') === 'brewer') {
      const modelViewer = document.querySelector("#resizable-boxb");
      
      if (modelViewer) {
        console.log('Triggering brewer animation, reversed:', isAnimationReversed);
        
        // Set timeScale based on current state
        modelViewer.timeScale = isAnimationReversed ? -1 : 1;
        
        // Play the animation once
        modelViewer.play({repetitions: 1});
        
        // Toggle the state for next time
        isAnimationReversed = !isAnimationReversed;
      }
    } else if (selectedModel) {
      console.log('Selected model does not have animation:', selectedModel.getAttribute('data-model'));
    } else {
      console.log('No model selected. Please select the animated model (Brewer) first.');
    }
  }

  // Initialize "Take it Apart" button
  function initTakeApartButton() {
    const takeApartButton = document.getElementById('take-apart-btn');
    
    if (takeApartButton) {
      takeApartButton.addEventListener('click', function() {
        console.log('Take it apart button clicked, current state reversed:', isAnimationReversed);
        
        // Only proceed if brewer model is selected
        if (selectedModel && selectedModel.getAttribute('data-model') === 'brewer') {
          triggerBrewerAnimation();
          
          // Update button text and appearance based on animation state
          if (isAnimationReversed) {
            takeApartButton.textContent = 'Put it Back';
            //takeApartButton.style.background = '#ffcdd2'; // Light red background
          } else {
            takeApartButton.textContent = 'Take it Apart';
            //takeApartButton.style.background = ''; // Reset background
          }
        } else {
          console.log('Please select the animated model (Brewer) first.');
        }
      });
    }
  }

  // Initialize model selection and explain button
  initModelSelection();
  initExplainButton();
  initTakeApartButton();

  // Animation setup for the brewer model
  const modelViewer = document.querySelector("#resizable-boxb");
  
  if (modelViewer) {
    modelViewer.addEventListener("load", (ev) => {
      console.log('Available animations:', modelViewer.availableAnimations);
    });

    // Removed automatic reverse animation - now controlled by button toggle
  }

  // Timeline scroll animation
  const timelineObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, timelineObserverOptions);

  // Observe timeline items when they exist
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
});
