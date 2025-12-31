"use client";

import { useState, useEffect } from "react";
import { Inquiry } from "@/lib/supabase";

const ADMIN_PASSWORD = "rocket2024";

const statusLabels = {
  pending: "대기중",
  contacted: "연락완료",
  completed: "상담완료",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Inquiry["status"]>("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiry");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, status: Inquiry["status"]) => {
    try {
      const response = await fetch("/api/inquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setInquiries((prev) =>
          prev.map((inquiry) =>
            inquiry.id === id ? { ...inquiry, status } : inquiry
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/inquiry?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredInquiries =
    filter === "all"
      ? inquiries
      : inquiries.filter((i) => i.status === filter);

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    completed: inquiries.filter((i) => i.status === "completed").length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <span className="text-4xl">🚀</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">로켓콜 어드민</h1>
            <p className="text-gray-500 mt-1">관리자 로그인이 필요합니다</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <h1 className="text-2xl font-bold text-gray-900">
                로켓콜 어드민
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                랜딩페이지로 이동 →
              </a>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-500 text-sm">전체 문의</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-gray-500 text-sm">대기중</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-blue-600">
              {stats.contacted}
            </div>
            <div className="text-gray-500 text-sm">연락완료</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-gray-500 text-sm">상담완료</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="p-4 border-b flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              전체 ({stats.total})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              대기중 ({stats.pending})
            </button>
            <button
              onClick={() => setFilter("contacted")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "contacted"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              연락완료 ({stats.contacted})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              상담완료 ({stats.completed})
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    이름
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    전화번호
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    문의내용
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    접수일시
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    상태
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      문의 내역이 없습니다
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-primary-600 hover:underline"
                        >
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-gray-600 max-w-xs truncate">
                        {inquiry.inquiry || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-500 text-sm">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              inquiry.id,
                              e.target.value as Inquiry["status"]
                            )
                          }
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                            statusColors[inquiry.status]
                          }`}
                        >
                          <option value="pending">{statusLabels.pending}</option>
                          <option value="contacted">
                            {statusLabels.contacted}
                          </option>
                          <option value="completed">
                            {statusLabels.completed}
                          </option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
