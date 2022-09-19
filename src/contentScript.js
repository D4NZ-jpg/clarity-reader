import Mercury from '@postlight/mercury-parser';

function createHeader(RTitle, RAuthor, RDate) {
  // Make header
  let header = document.createElement('div');

  // Make title
  if (RTitle) {
    let title = document.createElement('h1');
    title.textContent = RTitle;
    header.appendChild(title);
  }

  // Make author
  if (RAuthor) {
    let author = document.createElement('h3');
    author.textContent = RAuthor;
    header.appendChild(author);
  }

  // Make date
  if (RDate) {
    let date = document.createElement('h4');
    date.textContent = new Date(Date.parse(RDate)).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    header.appendChild(date);
  }

  header.appendChild(document.createElement('br'));
  return header;
}

// If web container exist then close read view, else create it
if (document.getElementById('clarity-reader-webContainer')) {
  document.body.innerHTML = document.getElementById(
    'clarity-reader-webContainer'
  ).innerHTML;
} else {
  Mercury.parse().then((r) => {
    // Get current DOM and enclose it in a div
    let web = document.createElement('div');
    web.id = 'clarity-reader-webContainer';
    web.innerHTML = document.body.innerHTML;
    web.style.display = 'none';
    document.body.innerHTML = '';
    document.body.appendChild(web);

    // Make the container for the article
    let container = document.createElement('div');
    container.innerHTML = r.content;
    container.id = 'clarity-reader-articleContainer';

    //Add container to document
    document.body.appendChild(container);
    container.insertBefore(
      createHeader(r.title, r.author, r.date_published),
      container.firstChild
    );
  });
}
