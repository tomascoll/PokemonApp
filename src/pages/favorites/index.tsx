import { useEffect, useState } from "react";
import { Layout } from "@/components/layouts";
import { Favorites, NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { Card, Grid } from "@nextui-org/react";

const FavoritesPage = () => {

  const [favoritesPokemons, seTfavoritesPokemons] = useState<number[]>([])
  useEffect(() => {
    seTfavoritesPokemons(localFavorites.pokemons)
  }, [])
  
  
  return (
    <Layout title="Pokemons - Favoritos">
      {
        favoritesPokemons.length === 0
        ? ( <NoFavorites/>)
        : ( 
          <Favorites pokemons={favoritesPokemons}/>
        )
      }
    </Layout>
  );
};

export default FavoritesPage;
