import classes from "./css/InfoCard.module.css";

function InfoCard() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>How it works</h2>
      <div className={classes.text}>
        <p>
          Place on any painting of your choice a stake of any amount, and
          therefore take part in the bid for this artwork. Your chance to win
          will then be directly proportional to the amount of your stake
          compared to the sum of all other bidders stakes.
        </p>
        <p>
          So if for example you placed a stake of 20€ for a painting, while the
          combined sum of all other bidders stakes is 60€, your chance to win
          will therefore be exactly 25%.
        </p>
        <p>
          The bidding for any painting thereby undergoes two stages, each of
          them lasting two minutes. In the first, you may place, increase and
          revoke any stake at any time.
        </p>
        <p>
          Should in this stages the minmal reuqired sum of combined stakes be
          reached, the artwork will then, after the first stage has finished,
          enter the second one. If however this is not the case, all stakes will
          be revoked and the bidding for this painting stopped.
        </p>
        <p>
          In the second stage, placed stakes cannot be revoked anymore but
          instead only be raised, therefore increasing your chance to win. After
          the end of this stage the winner will then be determined. Different
          from classical auctions however, any placed stake will be withdrawn,
          regardless if the painting is won or not.
        </p>
        <p className={classes.end}>Good Luck!</p>
      </div>
    </div>
  );
}

export default InfoCard;
