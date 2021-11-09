const output = document.querySelector('.output');
const output1 = document.createElement('div');

const ul = document.createElement('ul');
output.append(output1);
output.append(ul);

const url = '/api/list';

window.addEventListener('DOMContentLoaded', () => {
    output1.textContent = '';
    loadData();
})

function loadData() {
    fetch(url).then(rep=>rep.json())
    .then((data) => {
        console.log(data);
    })
}