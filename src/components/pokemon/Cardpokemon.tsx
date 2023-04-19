import { SmallPokemon } from "@/interfaces";
import { Card, Divider, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  pokemon: SmallPokemon;
}

export const Cardpokemon: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <>
      <Grid xs={6} sm={4} md={2} xl={1} key={pokemon.id}>
        <Card isHoverable isPressable onClick={onClick} variant="bordered">
          <Card.Body css={{ paddingTop: 20, paddingBottom: 20 }}>
            <Card.Image src={pokemon.img} width="100%" height={140} />
          </Card.Body>
          <Divider />
          <Card.Footer>
            <Row justify="space-between">
              <Text transform="capitalize">{pokemon.name}</Text>
              <Text css={{ fontWeight: "$bold" }}>#{pokemon.id}</Text>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  );
};
