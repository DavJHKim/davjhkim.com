// View counter functionality - integrated with modern design
async function updateCounter() {
    let data;

    // Check if the view has already been counted in this session
    if (!sessionStorage.getItem('viewCounted')) {
        console.log("New session detected. Sending POST request to increment counter...");

        try {
            // If not counted, send a POST request to increment the counter
            let response = await fetch(`https://fa3ikps5tkrdenqxnnrx5huqtq0jbkfy.lambda-url.us-west-1.on.aws/?t=${new Date().getTime()}`, {
                method: 'POST'
            });
            
            let result = await response.json(); // Parse the JSON response
            data = result.views; // Extract the views count

            // Mark session as counted
            sessionStorage.setItem('viewCounted', 'true');
            console.log("Session marked as counted, view count updated to:", data);
        } catch (error) {
            console.log("Error updating counter:", error);
            return; // Exit gracefully if API fails
        }
    } else {
        console.log("Session already counted. Sending GET request to retrieve current count...");

        try {
            // If already counted, send a GET request to retrieve the current count
            let response = await fetch('https://fa3ikps5tkrdenqxnnrx5huqtq0jbkfy.lambda-url.us-west-1.on.aws/');
            let result = await response.json(); // Parse the JSON response
            data = result.views; // Extract the views count
        } catch (error) {
            console.log("Error fetching counter:", error);
            return; // Exit gracefully if API fails
        }
    }

    // Create and display the view counter in the footer
    createViewCounter(data);

    // For debugging: log the current view count
    console.log(`Current view count: ${data}`);
}

function createViewCounter(viewCount) {
    // Find the footer
    const footer = document.querySelector('footer .text-center');
    
    if (footer && viewCount) {
        // Create a subtle view counter element
        const viewElement = document.createElement('p');
        viewElement.className = 'mt-2 text-xs text-gray-400 dark:text-gray-500';
        
        let view = ordinal_suffix_of(viewCount);
        viewElement.innerHTML = `<i class="fas fa-eye mr-1"></i>You are the ${view} visitor`;
        
        // Insert the view counter
        footer.appendChild(viewElement);
    }
}

function ordinal_suffix_of(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st"; 
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

// Initialize counter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCounter();
});
