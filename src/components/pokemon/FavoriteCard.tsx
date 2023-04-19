import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  pokemonsId: number;
}

export const FavoriteCard: FC<Props> = ({ pokemonsId }) => {
  const router = useRouter();
  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonsId}`)
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonsId} onClick={onFavoriteClicked}>
        <Card isHoverable isPressable css={{ p: 10 }}>
          <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsId}.svg`}
            width={"100%"}
            height={140}
          />
        </Card>
    </Grid>
  );
};
