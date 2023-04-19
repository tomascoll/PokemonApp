import { Spacer, Text, useTheme, Link, Grid } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px 0px 0px",
        background: theme?.colors.gray50.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="icono app"
        width={70}
        height={70}
      />

      <Link>
        <NextLink href="/" passHref legacyBehavior>
          <Grid.Container alignItems="center">
            <Text color="white" h2>
              P
            </Text>
            <Text color="white" h3>
              okemon
            </Text>
          </Grid.Container>
        </NextLink>
      </Link>

      <Spacer css={{ flex: 1 }} />

      <Link>
        <NextLink href="/favorites" passHref legacyBehavior>
          <Text color="#B583E7
">Favoritos</Text>
        </NextLink>
      </Link>
    </div>
  );
};
