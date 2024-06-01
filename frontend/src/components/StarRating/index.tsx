import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function StarRating({rating} : {rating: string}) {
  return (
    <Stack spacing={1} className='star-rating'>
      <Rating name="half-rating-read" value={parseFloat(rating)} precision={0.5} readOnly />
    </Stack>
  );
}