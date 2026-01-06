// Counter Animation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Target elements with the counter class
    const counters = document.querySelectorAll('.portfolio-stat-number');
    const statsSection = document.querySelector('.portfolio-stats-section');
    
    // Store the original values
    const originalValues = [];
    counters.forEach(counter => {
        // Extract number from text like "10+" or "100%"
        let text = counter.textContent;
        let number = parseFloat(text);
        
        // Handle percentage and plus sign
        const isPercentage = text.includes('%');
        const hasPlus = text.includes('+');
        
        originalValues.push({
            element: counter,
            target: number,
            isPercentage: isPercentage,
            hasPlus: hasPlus,
            current: 0,
            increment: number / 50 // Smooth animation (50 frames)
        });
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.8) && // Start animation when 80% in view
            rect.bottom >= 0
        );
    }
    
    // Animate the counter
    function animateCounter(counterObj) {
        const { element, target, isPercentage, hasPlus, current, increment } = counterObj;
        
        if (current < target) {
            counterObj.current += increment;
            
            // For fast animations, ensure we reach the target
            if (counterObj.current >= target) {
                counterObj.current = target;
            }
            
            // Format the number
            let displayValue = Math.floor(counterObj.current);
            
            // Handle special cases
            if (target === 100 && isPercentage) {
                displayValue = Math.min(100, Math.floor(counterObj.current));
            }
            
            // Update the element
            element.textContent = displayValue + 
                                  (isPercentage ? '%' : '') + 
                                  (hasPlus && displayValue >= target ? '+' : '');
            
            // Continue animation
            requestAnimationFrame(() => animateCounter(counterObj));
        }
    }
    
    // Start counters when section is in view
    let animationStarted = false;
    
    function checkAndStartCounters() {
        if (!animationStarted && statsSection && isInViewport(statsSection)) {
            animationStarted = true;
            
            // Start all counters
            originalValues.forEach(counterObj => {
                // Reset current value
                counterObj.current = 0;
                
                // Start animation
                animateCounter(counterObj);
            });
            
            // Remove scroll listener after animation starts
            window.removeEventListener('scroll', checkAndStartCounters);
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', checkAndStartCounters);
    
    // Check immediately on load (in case section is already in view)
    checkAndStartCounters();
});