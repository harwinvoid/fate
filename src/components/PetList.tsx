import React, { useEffect, useState } from "react";
import "./PetList.less";

import petsAttr from "../data/attr";
import { PetCard } from "../ui/pet-card";

interface PetStat {
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
}

interface PetAttributes {
  [key: string]: PetStat;
}

// @ts-expect-error ignore
const petsAttributes: PetAttributes = petsAttr;

export interface Pet extends PetStat {
  id: string;
  name: string;
  image: string;
}

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

const visibleId = [...showId, ...shiningId];

type SortField = "hp" | "atk" | "def" | "int" | "spd";
type SortDirection = "asc" | "desc";

interface SortState {
  field: SortField;
  direction: SortDirection;
}

const PetList = () => {
  const [petList, setPetList] = useState<Pet[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    field: "hp",
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPetList = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        "https://api.paintswap.finance/v2/metadata/0xf2ab95244ce9f89116bee475fa3e6676f1a4daf7?numToSkip=0&numToFetch=200&orderBy=rank&orderDirection=desc&version=2&getUri=false&isInFNFTMarketplace=false&chainId=146&address=0xf2ab95244ce9f89116bee475fa3e6676f1a4daf7&allowNSFW=true&traits=%5B%5D&drillDown=false&useSaleFilters=false",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language":
              "zh-CN,zh;q=0.9,en-AS;q=0.8,en;q=0.7,zh-TW;q=0.6",
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
      const petList = json.nfts.map(
        (nft: { tokenId: number; name: string; image: string }) => ({
          id: nft.tokenId,
          name: nft.name,
          image: nft.image,
        })
      ) as Pet[];

      setPetList(
        petList
          .filter((pet: Pet) => visibleId.includes(pet.id.toString()))
          .map((pet: Pet) => ({
            ...pet,
            ...petsAttributes[pet.id],
          }))
      );
    } catch (error) {
      console.error("Error fetching pet list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  const handleSort = (field: SortField) => {
    setSortState((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAndSortedPetList = [...petList]
    .filter((pet) => pet.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      const aValue = a.stat?.[sortState.field] || 0;
      const bValue = b.stat?.[sortState.field] || 0;
      return sortState.direction === "asc" ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="pet-list">
      <div className="controls-container">
        <div className="sort-controls">
          {["HP", "ATK", "DEF", "INT", "SPD"].map((stat) => (
            <button
              key={stat}
              className={`btn btn-sm ${
                sortState.field === stat.toLowerCase()
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
              onClick={() => handleSort(stat.toLowerCase() as SortField)}
            >
              {stat}{" "}
              {sortState.field === stat.toLowerCase() && (
                <span className="ml-1">
                  {sortState.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search By Name..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">加载中...</div>
        </div>
      ) : (
        filteredAndSortedPetList.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))
      )}
    </div>
  );
};

export default PetList;
