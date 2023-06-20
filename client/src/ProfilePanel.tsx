import { createSignal, type Component, createEffect } from 'solid-js';
import { parseRdf } from 'ldo';
import { FoafProfile } from './ldo/foafProfile.typings';
import { FoafProfileShapeType } from './ldo/foafProfile.shapeTypes';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@suid/material';

const ProfilePanel: Component<{ webId?: string }> = ({ webId }) => {
  const [profile, setProfile] = createSignal<FoafProfile | undefined>(
    undefined,
  );

  createEffect(async () => {
    if (!webId) return;
    console.log(webId);
    const uri = webId.split('#')[0];
    const response = await fetch(uri);
    const text = await response.text();
    const parsed = await parseRdf(text, { baseIRI: uri });
    const parsedProfile = parsed
      .usingType(FoafProfileShapeType)
      .fromSubject(webId);
    console.log('image: ', parsedProfile?.img);
    setProfile(parsedProfile);
  });

  return (
    <>
      <h2>Profile Panel</h2>
      {profile ? (
        <Container sx={{ width: 'fit-content' }}>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5'>
                  {profile()?.name || 'Yotam Bloom'}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component='img'
              sx={{ width: 151 }}
              image={
                profile()?.img ||
                'https://mui.com/static/images/cards/live-from-space.jpg'
              }
              alt='Profile Picture'
            />
          </Card>
        </Container>
      ) : undefined}
    </>
  );
};

export default ProfilePanel;
