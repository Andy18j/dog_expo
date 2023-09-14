function fetchAndRenderDogs() {
    const adminToken = localStorage.getItem('adminToken');


    if (!adminToken) {
        alert('please login first');
        navigateTo('login.html');
        return;
    }

    
    fetch('http://localhost:3000/dogs', {
        headers: {
            'Authorization': `Bearer ${adminToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const dogCards = document.getElementById('dog-cards');
        dogCards.innerHTML = ''; 
        data.forEach(dog => {
            const dogCard = document.createElement('div');
            dogCard.classList.add('dog-card');
            dogCard.innerHTML = `
                <img src="th.jpg" alt="${dog.name}">
                <h3>${dog.name}</h3>
                <p>Age: ${dog.age}</p>
                <p>Gender: ${dog.gender}</p>
                <button class="edit-button" data-id="${dog.id}">Edit</button>
                <button class="delete-button" data-id="${dog.id}">Delete</button>
            `;
            dogCards.appendChild(dogCard);
        });

     
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        editButtons.forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching dog data. Please try again later.');
    });
}
function handleEdit(event) {
    const dogId = event.target.getAttribute('data-id');
    const newAge = prompt('Enter new age:');

    
    if (newAge === null || isNaN(newAge)) {
        alert('Invalid age. Please enter a valid number.');
        return;
    }




    
    const adminToken = localStorage.getItem('adminToken');
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ age: parseInt(newAge) })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Age updated successfully.');
         
            fetchAndRenderDogs();
        } else {
            alert('Failed to update age. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating age. Please try again later.');
    });
}


function handleDelete(event) {
    const dogId = event.target.getAttribute('data-id');


    if (confirm('Are you sure you want to delete this dog?')) {
        
        const adminToken = localStorage.getItem('adminToken');
        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert('Dog deleted successfully.');
               
                fetchAndRenderDogs();
            } else {
                alert('Failed to delete dog. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting dog. Please try again later.');
        });
    }
}


window.addEventListener('load', () => {
    fetchAndRenderDogs();
});

function handleFilterSortSearch() {
    const genderFilter = document.getElementById('gender-filter').value;


    const nameSearch = document.getElementById('name-search').value.toLowerCase();
    const ageSort = document.getElementById('age-sort').value;

    
    const adminToken = localStorage.getItem('adminToken');
    fetch('http://localhost:3000/dogs', {
        headers: {
            'Authorization': `Bearer ${adminToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // filter the data  sort, and search
        let filteredData = data;

        if (genderFilter) {
            filteredData = filteredData.filter(dog => dog.gender === genderFilter);
        }

        if (nameSearch) {
            filteredData = filteredData.filter(dog => dog.name.toLowerCase().includes(nameSearch));
        }

        if (ageSort === 'asc') {
            filteredData.sort((a, b) => a.age - b.age);
        } else if (ageSort === 'desc') {
            filteredData.sort((a, b) => b.age - a.age);
        }

        
        const dogCards = document.getElementById('dog-cards');
        dogCards.innerHTML = ''; 

        filteredData.forEach(dog => {
            const dogCard = document.createElement('div');
            dogCard.classList.add('dog-card');
            dogCard.innerHTML = `
                <img src="th.jpg" alt="${dog.name}">
                <h3>${dog.name}</h3>
                <p>Age: ${dog.age}</p>
                <p>Gender: ${dog.gender}</p>
                <button class="edit-button" data-id="${dog.id}">Edit</button>
                <button class="delete-button" data-id="${dog.id}">Delete</button>
            `;
            dogCards.appendChild(dogCard);
        });

        
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        editButtons.forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching and filtering dog data. Please try again later.');
    });
}


const genderFilterInput = document.getElementById('gender-filter');
const nameSearchInput = document.getElementById('name-search');
const ageSortInput = document.getElementById('age-sort');

genderFilterInput.addEventListener('change', handleFilterSortSearch);
nameSearchInput.addEventListener('input', handleFilterSortSearch);
ageSortInput.addEventListener('change', handleFilterSortSearch);
