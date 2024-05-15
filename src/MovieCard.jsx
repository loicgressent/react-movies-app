import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BrowserRouter, Link } from "react-router-dom";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MovieCard = ({
  title,
  overview,
  release_date,
  poster_path,
  id,
  backdrop_path,
  original_title,
  vote_average,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Card key={id} sx={{ maxWidth: 345, marginBottom: "15px", backgroundColor:'#eee' }}>
        
        <CardHeader
          title={<Link to={`/movies/${id}`}><h3>{title}</h3></Link>}
          subheader={`Titre original : ${original_title}`}
          subheaderTypographyProps={{fontSize: '0.8rem'}}
        />
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt="Affiche Film"
        />
        <CardContent>
        <Avatar sx={{position: 'absolute', color:'white', width: '30px', height: '30px', fontSize:'1rem', backgroundColor: "#1c54b2"}}>{Math.round(vote_average*10)/10}</Avatar>
        <Typography variant="body2" color="text.secondary">
          {`Date de sortie : ${release_date}`}
        </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography style={{textAlign:'justify'}}>{overview}</Typography>
          </CardContent>
        </Collapse>
      </Card>
  );
};

export default MovieCard;
