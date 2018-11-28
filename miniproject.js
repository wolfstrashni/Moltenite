// Link Constructor
function Links(title, link, points, ident) {
  this.title = title;
  this.link = link;
  this.points = points;
  this.ident = ident;
  
}
// UI Constr.
function UI() {}

// Add Links To List
UI.prototype.addLinkToList = function (link) {

  const trimmingPoint = function (link) {
    let c;
    ((link.link.toLowerCase().indexOf('www.') == -1) ? c = 0 : c = 4);
    ((link.link.toLowerCase().indexOf('https://') == -1) ? c += 0 : c += 8);
    ((link.link.toLowerCase().indexOf('http://') == -1) ? c += 0 : c += 7);
    return c;
  }

  const trimedLink = link.link.substring(trimmingPoint(link));
  const list = document.getElementById('out-block');
  const div = document.createElement('div');
  div.className = "link-box";
  div.innerHTML = `<a href="${link.link}"><div data-ident="${link.ident}" class="points-box"><p class="points">${link.points}</p><p>points</p></div></a><div class="url-box"><a href="${link.link}"><h2>${link.title}</h2></a><p><a href="${link.link}">(${trimedLink})</a></p><div><a href="" class="upvote">Upvote<a><a href="" class="downvote">Downvote<a></div></div>`;

  list.appendChild(div);
}

// Show Alert 
UI.prototype.showAlert = function (message, className, parentNodeselector, referenceNodeselector) {
  // Create div
  const span = document.createElement('span');
  //Add Classes
  span.className = `alert ${className}`;
  //Add text
  span.appendChild(document.createTextNode(message));
  //Get parent
  const parentNode = document.querySelector(parentNodeselector);
  //Get Form
  const referenceNode = document.querySelector(referenceNodeselector);
  // Insert alert
  parentNode.insertBefore(span, referenceNode);

  // Timeout for message
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

UI.prototype.vote = function (target) {

  if (target.className === 'upvote') {
    const t = target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild;
    var currentscore = t.textContent;
    if (currentscore < 10) {
      t.innerHTML = (parseInt(currentscore) + 1);
    }
  }
  if (target.className === 'downvote') {
    const t = target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild;
    var currentscore = t.textContent;

    if (currentscore > -10) {
      t.innerHTML = (parseInt(currentscore) - 1);
    }
  }
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('link').value = '';
}

// Session Storage 
function Store() {};


Store.prototype.getLinks = function () {
  let links;
  let unorderLinks;
  
  if (sessionStorage.getItem('links') === null) {
    unorderLinks = [];
    links = [];

  } else {
    // let unorderLinks = [{ title: "Vuk", link: "www.123456789.com", points: 1, ident: 1 },
    // { title: "Angular", link: "http://www.1234567890.com", points: 12, ident: 3 },
    // { title: "Fullstack", link: "http://1234567890.com", points: 5, ident: 5 },
    // { title: "Home", link: "https://www.1234567890.rs", points: 1, ident: 6 }];
    // console.log(unorderLinks);

    unorderLinks = JSON.parse(sessionStorage.getItem('links'));
    // Sorting Array by key in object

    links = unorderLinks.sort((a, b) => b.points - a.points);

  }
  
  return links;

}
Store.prototype.displayLinks = function () {
  const store = new Store();
  const links = store.getLinks();
  // console.log(' u displayLinks links je ' + links);
  ident = 0 ///////////////////////////////////////////////////////////
  // console.log('koliko je ident pre foreach = ' + ident);
  const ui = new UI;
  links.forEach(function (link, ident = 0) {
    link.ident = ident + 1;
    // console.log('link.ident U foreach = ' + link.ident);

    // Add link to UI
    ui.addLinkToList(link);
    // console.log('link.ident posle foreach = ' + link.ident);
   
  });
}

Store.prototype.addLink = function (link) {
  const store = new Store();
  const links = store.getLinks();
  link.ident = link.ident + 1;
  
  links.push(link); + 
  


  sessionStorage.setItem('links', JSON.stringify(links));
}

Store.prototype.updatePoints = function (ident) {

  const store = new Store();
  const links = store.getLinks();

 

  links.forEach(function (link, index) {
    
    link.ident = ident;

    if (link.ident === ident) {

      const obj = {
        "title": link.title,
        "link": link.link,
        "points": link.points,
        "ident": link.ident
      };
      // console.log('obj je = ' + obj);
      links.splice(index, 1, obj);
      // console.log(link.ident, ident);
      // console.log(links.splice(index, 1, obj));
    }

  });

  sessionStorage.setItem('links', JSON.stringify(links));

}


// DOM Load Event
document.addEventListener('DOMContentLoaded', new Store().displayLinks);




// Event Listener for Submit Link
document.getElementById('link-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value,
        link = document.getElementById('link').value;



  // Instantiate Links
  var links = new Links(title, link, points = 0, ident=0);


  // Instantiate UI
  const ui = new UI();
  const store = new Store();

  // Validate Input
  // Error
  let err = 0;

  if (link.length > 150) {
    ui.showAlert('URL have to be 150 characters or less!', 'lengtherror', '#linkwrap', '.link');
    err++;
  }
  if (title.length > 60) {
    ui.showAlert('Title have to be 60 characters or less!', 'lengtherror', '#titlewrap', '.title');
    err++;
  }
  if (!((link.toLowerCase().includes('http://')) || (link.toLowerCase().includes('https://')) || (link.toLowerCase().includes('www.')))) {
    ui.showAlert('You have to enter valid url', 'lengtherror', '#linkwrap', '.link');
    err++;
  }
  if (title === '' || link === '') {
    ui.showAlert('Please fill in all fields', 'error', '#titlewrap', '.title2');
    err++;
  }
  if (err == 0) {
    // Add link to list

    ui.addLinkToList(links);
    store.addLink(links);
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for Voting
document.getElementById('out-block').addEventListener('click', function (e) {
  const store = new Store();
  // Instantiate UI
  const ui = new UI();

  // Change Point Value
  ui.vote(e.target);

  // Change points
  store.updatePoints(e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute('data-ident'));

  // Voting Confirmation
  if ((e.target.className === 'upvote') || (e.target.className === 'downvote')) {
    ui.showAlert('Thank you for your vote', 'confirmation', 'body', 'container')
  };

  e.preventDefault();
});

//Event listener for 'Obavestenje'

document.querySelector('body').addEventListener('click', function (e) {

  if (e.target.id === 'header') {

    if (e.target.nextElementSibling.classList.contains('open')) {
      var next = e.target.nextElementSibling;
      next.style.maxHeight = null;
      next.classList.remove('open');
      e.target.classList.remove('active');

    } else {
      e.target.classList.add('active');
      e.target.nextElementSibling.classList.add('open');
      e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + 'px';

    }
    e.preventDefault();
  }
})