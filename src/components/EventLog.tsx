import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./EventLog.less";
import BattleEvent from "./BattleEvent";

// Constants
const SONIC_RPC_URL = "https://rpc.soniclabs.com/";
const SONICSCAN_API_URL = "https://api.sonicscan.org/api";
const API_KEY = "NQ1XVV7U3PIF2FF5DUPNZPQVG61S8QF61W";
const BATTLE_METHOD_ID = "0x2fa9ca3d";
const CONCURRENT_BATCH_SIZE = 5;

const EVENT_TYPES = {
  BattleResultV2: "0xed965831ff58bcf473e4bcfc1e0f5325bbb0c898866ca137ca39639ad40f3ca4",
};

const EVENT_ABI = [
  "event BattleResultV2(uint256 BattleRythm, uint256 bit, bool Won, uint256 randret, tuple(uint256 hp, uint256 attack, uint256 defense, uint256 speed, uint256 intelligence, uint256 genestrength, uint256 range, uint256 special)[6] unitgroup, uint256[3] oponentid, uint256[3] attackerid)",
];

// Interfaces
interface RawUnit {
  hp: bigint;
  attack: bigint;
  defense: bigint;
  speed: bigint;
  intelligence: bigint;
  genestrength: bigint;
  range: bigint;
  special: bigint;
}

interface Unit {
  id: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
  genestrength: number;
  range: number;
  special: number;
}

interface BattleResult {
  BattleRythm: number;
  bit: number;
  Won: boolean;
  randret: number;
  attackerUnits: Unit[];
  opponentUnits: Unit[];
}

interface BlockchainEvent {
  id: string;
  timestamp: string;
  type: "BattleResultV2";
  status: "success" | "error";
  transactionHash: string;
  blockNumber: number;
  battleResult?: BattleResult;
}

interface Transaction {
  hash: string;
  methodId: string;
  // Add other transaction properties as needed
}

const EventLog: React.FC = () => {
  // State
  const [events, setEvents] = useState<BlockchainEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [startBlock, setStartBlock] = useState("");
  const [endBlock, setEndBlock] = useState("");

  // Utils
  const getBlockNumberByTime = async (timestamp: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `${SONICSCAN_API_URL}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${API_KEY}`
      );
      const data = await response.json();
      return data.status === "1" && data.result ? data.result : null;
    } catch (error) {
      console.error("Error getting block number:", error);
      return null;
    }
  };

  const randomDelay = (min: number = 100, max: number = 1000) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  const decodeBattleResult = (log: ethers.Log): BlockchainEvent["battleResult"] => {
    try {
      const iface = new ethers.Interface(EVENT_ABI);
      const decoded = iface.parseLog({
        topics: log.topics,
        data: log.data,
      });

      if (!decoded) return undefined;

      const allUnits = decoded.args[4].map((unit: RawUnit) => ({
        hp: Number(unit.hp),
        attack: Number(unit.attack),
        defense: Number(unit.defense),
        speed: Number(unit.speed),
        intelligence: Number(unit.intelligence),
        genestrength: Number(unit.genestrength),
        range: Number(unit.range),
        special: Number(unit.special),
      }));

      const attackerIds = decoded.args[6].map((x: bigint) => Number(x));
      const opponentIds = decoded.args[5].map((x: bigint) => Number(x));

      const attackerUnits = allUnits
        .slice(0, attackerIds.length)
        .map((unit: Omit<Unit, "id">, index: number) => ({ ...unit, id: attackerIds[index] }));
      const opponentUnits = allUnits
        .slice(attackerIds.length)
        .map((unit: Omit<Unit, "id">, index: number) => ({ ...unit, id: opponentIds[index] }));

      return {
        BattleRythm: Number(decoded.args[0]),
        bit: Number(decoded.args[1]),
        Won: decoded.args[2],
        randret: Number(decoded.args[3]),
        attackerUnits,
        opponentUnits,
      };
    } catch (error) {
      console.error("Error decoding battle result:", error);
      return undefined;
    }
  };

  // Event Handlers
  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (!date) {
      setStartBlock("");
      setEndBlock("");
      return;
    }

    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const startTimestamp = Math.floor(startOfDay.getTime() / 1000);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      const endTimestamp = Math.floor(endOfDay.getTime() / 1000);

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const targetEndTimestamp = Math.min(endTimestamp, currentTimestamp);

      const startBlockNumber = await getBlockNumberByTime(startTimestamp);
      const endBlockNumber = await getBlockNumberByTime(targetEndTimestamp);

      if (startBlockNumber && endBlockNumber) {
        setStartBlock(startBlockNumber);
        setEndBlock(endBlockNumber);
      }
    } catch (error) {
      console.error("Error processing date:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address && startBlock && endBlock) {
      setLoading(true);
      await fetchTransactions(address);
    }
  };

  const toggleEventExpand = (eventId: string) => {
    setExpandedEvents(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  // Data Fetching
  const fetchTransactionEvents = async (hash: string): Promise<BlockchainEvent[]> => {
    if (!hash) return [];

    try {
      await randomDelay();
      const provider = new ethers.JsonRpcProvider(SONIC_RPC_URL);
      const receipt = await provider.getTransactionReceipt(hash);
      if (!receipt) return [];

     

      const relevantLogs = receipt.logs.filter(
        log => 
          log.topics[0] === EVENT_TYPES.BattleResultV2
      );


      const processLog = async (log: ethers.Log): Promise<BlockchainEvent> => {
        await randomDelay();
        const block = await provider.getBlock(log.blockNumber);
        const timestamp = block ? new Date(block.timestamp * 1000).toLocaleString() : "";
        const battleResult = decodeBattleResult(log);

        return {
          id: `${log.blockNumber}-${log.transactionIndex}`,
          timestamp,
          type: "BattleResultV2",
          status: battleResult?.Won ? "success" : "error",
          transactionHash: log.transactionHash,
          blockNumber: log.blockNumber,
          battleResult,
        };
      };

      return await Promise.all(relevantLogs.map(processLog));
    } catch (error) {
      console.error("Error fetching transaction events:", error);
      return [];
    }
  };

  const fetchTransactions = async (address: string) => {
    if (!startBlock || !endBlock) return;

    try {
      const response = await fetch(
        `${SONICSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=1&offset=1000&sort=desc&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "1" && data.result) {
        const battleTransactions = data.result.filter(
          (tx: Transaction) => tx.methodId === BATTLE_METHOD_ID
        );

       

        const allEvents: BlockchainEvent[] = [];
        for (let i = 0; i < battleTransactions.length; i += CONCURRENT_BATCH_SIZE) {
          const batch = battleTransactions.slice(i, i + CONCURRENT_BATCH_SIZE);
          const batchEvents = await Promise.all(
            batch.map((tx: Transaction) => fetchTransactionEvents(tx.hash))
          );
          allEvents.push(...batchEvents.flat());
        }

        setEvents(allEvents);
      } else {
        console.error("Failed to fetch transactions:", data.message);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchTransactions(address);
  }, []);

  // Render
  return (
    <div className="event-log">
      <div className="event-log-header">
        <div className="event-controls">
          <form onSubmit={handleSearch} className="card bg-base-200">
            <div className="card-body p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-semibold">钱包地址</span>
                  </label>
                  <div className="join w-full">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="输入钱包地址..."
                      className="input input-bordered join-item w-full"
                    />
                    <button type="button" className="btn join-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-semibold">选择日期</span>
                  </label>
                  <div className="join w-full">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="input input-bordered join-item w-full"
                    />
                    <button type="button" className="btn join-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-3">
                <button type="submit" className="btn btn-primary gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  查询战斗记录
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="event-list space-y-3">
          {events.length === 0 ? (
            <div className="alert alert-info">
              <span>未找到战斗结果</span>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`card bg-base-100 ${
                  event.status === "success"
                    ? "border-success"
                    : event.status === "error"
                    ? "border-error"
                    : "border-info"
                }`}
              >
                <BattleEvent
                  event={event}
                  isExpanded={expandedEvents[event.id] || false}
                  onToggleExpand={() => toggleEventExpand(event.id)}
                />
                <div className="card-actions justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm opacity-75">
                      Block: {event.blockNumber}
                    </span>
                  </div>
                  <a
                    href={`https://sonicscan.org/tx/${event.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    View Transaction
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EventLog;
