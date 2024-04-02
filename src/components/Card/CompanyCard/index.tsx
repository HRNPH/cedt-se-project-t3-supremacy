import { type FC } from "react";
import Avvvatars from "avvvatars-react";
import Link from "next/link";

interface CompanyCardProps {
  name: string;
  description: string;
  id: string;
}

const CompanyCard: FC<CompanyCardProps> = ({ id, name, description }) => {
  return (
    <Link href={`/companies/${id}`}>
      <li className="e col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition duration-500 ease-in-out hover:scale-95">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {name}
              </h3>
            </div>
            <p className="mt-1 truncate text-sm text-gray-500">{description}</p>
          </div>
          <Avvvatars
            value={name || "Anonymous"}
            size={80}
            border={true}
            radius={100}
          />
        </div>
      </li>
    </Link>
  );
};

export default CompanyCard;
