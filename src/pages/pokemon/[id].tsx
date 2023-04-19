import { useEffect, useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Layout } from "@/components/layouts";
import { Pokemon } from "../../interfaces/pokemon-full";
import { Button, Card, Container, Divider, Grid, Image, Text } from "@nextui-org/react";
import { localFavorites, getPokemonInfo } from "@/utils";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
  id: string;
  name: string;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setisInFavorites] = useState(false);

  useEffect(() => {
    setisInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  const onToggleFavorite = () => {
    localFavorites.togglelFavorites(pokemon.id);
    setisInFavorites(!isInFavorites);

    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 150,
      angle: -100,
      origin: {
        x: 0.5,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ m:0, marginTop: "5px", width:'100%' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }} variant="bordered">
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card variant="bordered">
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between", flexWrap:'wrap' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
                css={{
                  '@xs':{
                    marginBottom:0
                  }, 
                  marginBottom:'5px'
                }}
              >
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Divider/>
            <Card.Body>
              <Text
                size={30}
                weight="semibold"
              >
                Sprites
              </Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
