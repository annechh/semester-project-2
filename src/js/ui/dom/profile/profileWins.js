import { readListingsWins } from '../../../api/profile/read';
import { applyBreakWordClass } from '../../../utilities/breakLongWords';
import { formatDate } from '../../../utilities/formatDate';
import { getLocalStorage } from '../../../utilities/localStorage';
import { LISTING_PAGE } from '../../../utilities/pagePaths';
import { sortBidsByLatest } from '../../../utilities/sortBids';
import { createHtmlElement } from '../createElement';

export async function buildListingsWins() {
  const profileName = new URLSearchParams(window.location.search).get('name');
  const loggedInName = getLocalStorage().name;

  const targetProfileName =
    !profileName || profileName === loggedInName ? loggedInName : profileName;

  const userData = await readListingsWins(targetProfileName);

  const profileAuctions = document.getElementById('profileWins');
  profileAuctions.classList.add(
    'max-w-[1920px]',
    'h-full',
    'grid',
    'grid-cols-1',
    'lg:grid-cols-2',
    'gap-[10px]',
    'mx-4'
  );

  userData.profile.forEach((data) => {
    const listingCard = createHtmlElement({
      element: 'div',
      className: [
        'listing-card',
        'border',
        'rounded',
        'hover:cursor-pointer',
        'bg-white',
        'dark:bg-darkBG',
        'hover:drop-shadow-yellow',
        'dark:border-whiteFaded',
      ],
      id: data.id,
    });

    const contentContainer = createHtmlElement({
      element: 'div',
      className: [
        'content-container',
        'p-5',
        'flex',
        'flex-col',
        'md:flex-row',
        'gap-2',
        'md:gap-5',
      ],
    });

    contentContainer.addEventListener('click', () => {
      window.location.href = `${LISTING_PAGE}?title=${data.title}&id=${data.id}`;
    });

    const listingImageContainer = createHtmlElement({
      element: 'div',
      className: [
        'flex',
        'items-center',
        'justify-center',
        'flex-1',
        'border',
        'w-full',
        'max-h-[200px]',
        'sm:max-h[240px]',
        'h-full',
        'overflow-hidden',
        'drop-shadow-darkFaded',
      ],
    });

    const listingImage = createHtmlElement({
      element: 'img',
      src:
        data.media && data.media.length > 0
          ? data.media[0].url
          : '/images/placeholder-image.png',
      alt: data.media && data.media.length > 0 ? data.media[0].alt : '',
      className: ['object-cover', 'w-full', 'h-full', 'aspect-[4/3]'],
    });

    const textContainer = createHtmlElement({
      element: 'div',
      id: 'textContainer',
      className: ['flex', 'flex-col', 'flex-1', 'justify-between', 'gap-2'],
    });

    const listingTitle = createHtmlElement({
      element: 'h2',
      textContent: data.title ?? '',
      className: ['mb-auto', 'line-clamp-1'],
    });
    applyBreakWordClass(listingTitle);

    const dateCreditsContainer = createHtmlElement({
      element: 'div',
      id: 'dateCredits',
      className: ['flex', 'items-end', 'justify-between'],
    });

    const wonDateContainer = createHtmlElement({
      element: 'div',
      className: ['border-darkFaded', 'flex', 'gap-2', 'items-end'],
    });

    const won = createHtmlElement({
      element: 'p',
      textContent: 'Won ',
      className: ['card-text'],
    });

    const endDate = createHtmlElement({
      element: 'p',
      textContent: formatDate(data.endsAt),
      className: ['card-text'],
    });

    const bidContainer = createHtmlElement({
      element: 'div',
      className: ['bid-container', 'flex', 'items-center', 'gap-2'],
    });

    const sortedBids = sortBidsByLatest(data.bids);
    const latestBidAmount = sortedBids[0]?.amount;

    const bidAmount = createHtmlElement({
      element: 'p',
      className: ['card-text', 'font-semibold'],
      textContent: latestBidAmount,
    });

    const creditIcon = createHtmlElement({
      element: 'i',
      className: ['fa-solid', 'fa-coins', 'dark:text-white'],
    });

    listingImageContainer.appendChild(listingImage);
    bidContainer.append(bidAmount, creditIcon);
    wonDateContainer.append(won, endDate);
    dateCreditsContainer.append(wonDateContainer, bidContainer);
    textContainer.append(listingTitle, dateCreditsContainer);

    contentContainer.append(listingImageContainer, textContainer);
    listingCard.append(contentContainer);
    profileAuctions.append(listingCard);
  });
  return profileAuctions;
}
