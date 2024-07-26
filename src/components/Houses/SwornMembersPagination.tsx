import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SwornMember } from '../../types';

interface SwornMembersPaginationProps {
  swornMembers: SwornMember[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  membersPerPage: number;
}

const SwornMembersPagination: React.FC<SwornMembersPaginationProps> = ({
  swornMembers,
  currentPage,
  setCurrentPage,
  membersPerPage,
}) => {
  const pageCount = Math.ceil(swornMembers.length / membersPerPage);
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = swornMembers.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4 text-[#f9da5c] uppercase">
        Sworn Members
      </h3>
      <ul className="list-none pl-0">
        {currentMembers.map((member, index) => (
          <li key={index}>
            <span className="mr-3">➳</span>
            <Link
              to={`/characters?id=${member.id}`}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              {member.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-x-3 items-center mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-800 text-gray-200 rounded border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg"
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, pageCount))}
          disabled={currentPage === pageCount}
          className="p-2 bg-gray-800 text-gray-200 rounded border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg"
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default SwornMembersPagination;