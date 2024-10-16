import { Link } from 'react-router-dom';

import linkIcon from '../assets/link-icon.svg';
import classes from './Article.module.css';

const Article = ({ item }) => {
  const date = new Date(item.modified);
  const formattedDate = `
                ${date.getDate()}.${
    date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }.${date.getFullYear()}
                `;

  return (
    <article className={classes.article}>
      <p className={classes.date}>{formattedDate}</p>
      <div className={classes.container}>
        <Link to="TBD" className={classes.heading}>
          {item.title?.rendered}
        </Link>
        <img className={classes.icon} src={linkIcon} alt="Link icon" />
      </div>
    </article>
  );
};
export default Article;