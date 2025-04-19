import React, { useEffect, useState } from "react";
import "./PetList.less";
import dark from "../assets/elements/dark.png";
import fire from "../assets/elements/fire.png";
import water from "../assets/elements/water.png";
import nature from "../assets/elements/nature.png";
import electric from "../assets/elements/electric.png";
import light from "../assets/elements/light.png";
import ice from "../assets/elements/ice.png";
import petsAttr from "../data/attr.json";

interface PetAttributes {
  [key: string]: {
    stat: {
      hp: number;
      atk: number;
      def: number;
      spd: number;
      int: number;
    };
    skills: Array<{
      attribute: string;
      type: string;
      description: string;
    }>;
    elements?: string[];
  };
}

const petsAttributes: PetAttributes = petsAttr;

interface Pet {
  id: string;
  name: string;
  image: string;
  elements: string[];
  stat: {
    hp: number;
    atk: number;
    def: number;
    int: number;
    spd: number;
  };
}

const elementIcons = {
  dark,
  fire,
  water,
  nature,
  electric,
  light,
  ice,
};


const showId = [
  "4",
  "5",
  "6",
  "10",
  "11",
  "12",
  "16",
  "17",
  "18",
  "25",
  "26",
  "27",
  "28",
  "31",
  "32",
  "39",
  "40",
  "43",
  "44",
  "47",
  "48",
  "69",
  "70",
  "71",
  "73",
  "74",
  "75",
  "77",
  "78",
  "79",
  "81",
  "82",
];

const shiningId = showId.map((id) => {
  if (id.length === 1) {
    return `1000${id}`;
  }
  return `100${id}`;
});

const visibleId = [
  ...showId, 
  // ...shiningId
];

// const otherId = [77,]

type SortField = 'hp' | 'atk' | 'def' | 'int' | 'spd';
type SortDirection = 'asc' | 'desc';

interface SortState {
  field: SortField;
  direction: SortDirection;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

const PetList: React.FC<{ pets: Pet[] }> = () => {
  const [petList, setPetList] = useState<Pet[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    field: 'hp',
    direction: 'desc'
  });

  const fetchPetList = async () => {
    const data = await fetch(
      "https://api.paintswap.finance/v2/metadata/0xf2ab95244ce9f89116bee475fa3e6676f1a4daf7?numToSkip=0&numToFetch=200&orderBy=rank&orderDirection=desc&version=2&getUri=false&isInFNFTMarketplace=false&chainId=146&address=0xf2ab95244ce9f89116bee475fa3e6676f1a4daf7&allowNSFW=true&traits=%5B%5D&drillDown=false&useSaleFilters=false",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en-AS;q=0.8,en;q=0.7,zh-TW;q=0.6",
          "if-none-match": 'W/"a13c-aTZX8wFsXXA8ciWRQxCKM1mrjFU"',
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );
    const json = await data.json();
    console.log(json);
    const petList = json.nfts.map(
      (nft: { tokenId: number; name: string; image: string }) => ({
        id: nft.tokenId,
        name: nft.name,
        image: nft.image,
        // rarity: nft.rarity,
        // elements: nft.elements,
        // hp: nft.hp,
        // str: nft.str,
        // def: nft.def,
      })
    ) as Pet[];

    setPetList(
      petList
        .filter((pet: Pet) =>
         visibleId.includes(pet.id.toString())
        )
        .map((pet: Pet) => ({
          ...pet,
          ...petsAttributes[pet.id],
        }))
        .sort((a, b) => Number(a.id) - Number(b.id)) as Pet[]
    );
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  const handleSort = (field: SortField) => {
    setSortState(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const sortedPetList = [...petList].sort((a, b) => {
    const aValue = a.stat?.[sortState.field] || 0;
    const bValue = b.stat?.[sortState.field] || 0;
    return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className="pet-list">
      <div className="sort-controls">
        {['HP', 'ATK', 'DEF', 'INT', 'SPD'].map(stat => (
          <button
            key={stat}
            className={`btn btn-sm ${sortState.field === stat.toLowerCase() ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => handleSort(stat.toLowerCase() as SortField)}
          >
            {stat} {sortState.field === stat.toLowerCase() && (
              <span className="ml-1">
                {sortState.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ))}
      </div>
      {sortedPetList.map((pet) => (
        <div key={pet.id} className={`pet-card`}>
          <div className="pet-header">
            <h3 className="pet-name">{pet.name}</h3>
          </div>

          <div className="pet-image-container">
            <img src={pet.image} alt={pet.name} className="pet-image" />

            <div className="pet-elements">
              {pet.elements?.map((element, index) => (
                <div
                  key={index}
                  className={`element-icon`}
                  style={{
                    backgroundImage: `url(${
                      elementIcons[
                        element.toLocaleLowerCase() as keyof typeof elementIcons
                      ]
                    })`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="pet-stats">
            <div className="stat-row">
              <div className="stat">
                <span className="stat-label">HP</span>
                <span className="stat-value">{pet.stat?.hp ? formatNumber(pet.stat.hp) : "-"}</span>
              </div>
              <div className="stat">
                <span className="stat-label">ATK</span>
                <span className="stat-value">{pet.stat?.atk || "-"}</span>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-label">DEF</span>
                <span className="stat-value">{pet.stat?.def || "-"}</span>
              </div>
              <div className="stat">
                <span className="stat-label">INT</span>
                <span className="stat-value">{pet.stat?.int || "-"}</span>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-label">SPD</span>
                <span className="stat-value">{pet.stat?.spd || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetList;
