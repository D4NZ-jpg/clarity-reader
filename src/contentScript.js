import Mercury from '@postlight/mercury-parser';
import './style.scss';

function createHeader(RTitle, RAuthor, RDate) {
  // Make header
  let header = document.createElement('div');
  header.className = 'header';

  // Make title
  if (RTitle) {
    let title = document.createElement('h1');
    title.id = 'title';
    title.textContent = RTitle;
    header.appendChild(title);
  }

  // Data div
  let data = document.createElement('div');
  data.id = 'metadata';

  // Make author
  if (RAuthor) {
    let author = document.createElement('h4');
    author.id = 'author';
    author.textContent = RAuthor;
    data.appendChild(author);
  }

  // Make date
  if (RDate) {
    let date = document.createElement('h4');
    date.id = 'date';
    date.textContent = new Date(Date.parse(RDate)).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    data.appendChild(date);
  }

  header.appendChild(data);
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
    container.id = 'articleContainer';

    //Add container to document
    container.insertBefore(
      createHeader(r.title, r.author, r.date_published),
      container.firstChild
    );
    let page = document.createElement('div');
    page.id = 'clarity-reader-articleContainer';
    page.appendChild(container);
    document.body.appendChild(page);
  });
}
