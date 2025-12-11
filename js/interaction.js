/**
 * Modal Interaction Types
 */

const serviceOptions = {
    bathroom: [
        "Master Bath Remodel",
        "Guest Bath Update",
        "Tub-to-Shower Conversion",
        "New Vanity Installation",
        "Tile Replacement",
        "Plumbing Fixture Upgrade"
    ],
    kitchen: [
        "Full Kitchen Remodel",
        "Cabinet Refacing",
        "Countertop Installation",
        "Backsplash Tiling",
        "Kitchen Island Addition",
        "Lighting Upgrade"
    ],
    flooring: [
        "Hardwood Flooring",
        "Tile Flooring",
        "Vinyl Plank (LVP)",
        "Laminate Flooring",
        "Carpet Removal",
        "Subfloor Repair"
    ]
};

let currentService = '';

window.openServiceModal = (serviceType) => {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('modalTitle');
    const optionsContainer = document.getElementById('modalOptions');

    currentService = serviceType;

    // Set Title
    const titles = {
        bathroom: 'Bathroom Remodel Services',
        kitchen: 'Kitchen Upgrade Options',
        flooring: 'Flooring Selection'
    };
    title.innerText = titles[serviceType] || 'Select Services';

    // Populate Options
    optionsContainer.innerHTML = '';
    const options = serviceOptions[serviceType] || [];

    options.forEach(opt => {
        const label = document.createElement('label');
        label.className = 'modal-option-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = opt;
        checkbox.name = 'serviceOption';

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(opt));
        optionsContainer.appendChild(label);
    });

    modal.style.display = 'block';
};

window.closeServiceModal = () => {
    document.getElementById('serviceModal').style.display = 'none';
};

window.submitServiceSelection = () => {
    const checkboxes = document.querySelectorAll('input[name="serviceOption"]:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);

    if (selected.length === 0) {
        alert('Please select at least one service option.');
        return;
    }

    // Redirect to estimate page with params
    const params = new URLSearchParams();
    params.append('service', currentService);
    params.append('details', selected.join(', '));

    window.location.href = `pages/estimate.html?${params.toString()}`;
};

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) {
        closeServiceModal();
    }
};
